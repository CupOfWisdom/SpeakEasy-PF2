import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoutes = () => {
	const { signed, authLoading } = useAuth();

	if (authLoading) {
		// Renderizar um componente de carregamento ou uma mensagem de verificação em andamento
		return <div>Loading...</div>;
	}

	return signed ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;