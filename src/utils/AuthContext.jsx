import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
	createUserWithEmailAndPassword,
	signOut,
	signInWithEmailAndPassword,
	updateProfile,
	onAuthStateChanged,
	sendEmailVerification,
} from "firebase/auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "./server-config";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const userCollectionRef = collection(db, "users");
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const [authLoading, setAuthLoading] = useState(true);

	const navigate = useNavigate();

    useEffect(() => {
		async function loadUser() {
			const storageUser = localStorage.getItem("@speakeasy");
			if (storageUser) {
				console.log("Ususario: ", storageUser.name);
				setUser(JSON.parse(storageUser));
				setAuthLoading(false);
			}
			setAuthLoading(false);
		}
		loadUser();
	}, []);

    const loginUser = async (email, password) => {
		setLoading(true);

		await signInWithEmailAndPassword(auth, email, password)
			.then(async (value) => {
				if (value.user.emailVerified) {
					let uid = value.user.uid;
					const docSnap = await getDoc(doc(userCollectionRef, uid));

					let data = {
						uid: uid,
						displayName: docSnap.data().displayName,
						email: value.user.email,
					};

					storageUser(data);
					setUser(data);
					navigate("/");
					setLoading(false);
				} else {
					setLoading(false);
				}
			})
			.catch((error) => {
				console.log(error);
				let systemErrorMessage;

				if (error.message.includes("invalid-login-credentials")) {
					systemErrorMessage = "Email ou senha foram inseridas erradas.";
				} else if (error.message.includes("auth/missing")) {
					systemErrorMessage = "Senha ou email nao foram inseridos";
				} else {
					systemErrorMessage = "Ocorreu agum erro.";
				}
				setError(systemErrorMessage);
				setLoading(false);
			});
	};

	const registerUser = async (name, email, password) => {
		setLoading(true);

		await createUserWithEmailAndPassword(auth, email, password)
			.then(async (value) => {
				// sendEmailVerification(value.user).then(() =>
				// );

				let uid = value.user.uid;
				await updateProfile(value.user, {
					displayName: name,
					photoURL: null,
				});


				await setDoc(doc(userCollectionRef, uid), {
					uid: uid,
					displayName: name,
					email: email,
					photoURL: null,
				}).then(() => {
					let data = {
						uid: uid,
						displayName: name,
						email: value.user.email,
						photoURL: null,
					};
					storageUser(data);
					setUser(data);
                    navigate("/");
					setLoading(false);
				});
			})
			.catch((error) => {
				console.log(error);
				let systemErrorMessage;

				if (error.message.includes("auth/email-already-in-use")) {
					systemErrorMessage =
						"Esse e-mail já foi cadastrado no nosso banco de dados";
				} else if (error.message.includes("auth/missing")) {
					systemErrorMessage = "Senha ou e-mail não foram inseridos";
				} else {
					systemErrorMessage = "Ocorreu algum erro.";
				}
				setError(systemErrorMessage);
				setLoading(false);
			});
	};

	const logOut = async () => {
		await signOut(auth);
		localStorage.removeItem("@speakeasy");
		setUser(null);
	};

	const storageUser = (data) => {
		localStorage.setItem("@speakeasy", JSON.stringify(data));
	}

	const contextData = {
		signed: !!user,
		user,
		loading,
		error,
		authLoading,
		loginUser,
		registerUser,
		logOut,
		storageUser,
		setUser,
	};

	return (
		<AuthContext.Provider value={contextData}>
			{/* {loading ? <p>Loading...</p> : children} */}
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};

export default AuthContext;