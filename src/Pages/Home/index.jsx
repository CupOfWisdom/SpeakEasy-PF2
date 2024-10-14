import React, { useContext, useRef, useState, useEffect } from "react";
import "./style.css";
import Navbar from "../../Components/Navbar";
import { VideoContext } from "../../utils/VideoContext";
import emotionData from "../../utils/emotion_data_video1 (1).json";  // Ajuste o caminho conforme necessário
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SpeakEasy = () => {
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [currentEmotion, setCurrentEmotion] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [emotionCount, setEmotionCount] = useState({});
  const videoRef = useRef(null);

  // Função para carregar o vídeo
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "video/mp4") {
      setVideoFile(file);
    } else {
      alert("Por favor, envie um arquivo de vídeo MP4.");
    }
  };

  // Função para selecionar emoções
  const handleEmotionChange = (e) => {
    const emotion = e.target.value;
    setSelectedEmotions((prevEmotions) =>
      prevEmotions.includes(emotion)
        ? prevEmotions.filter((item) => item !== emotion)
        : [...prevEmotions, emotion]
    );
  };

  // Função para contar a ocorrência de cada emoção
  const calculateEmotionPercentages = () => {
    const emotionCounts = {};

    // Inicializa as contagens das emoções
    emotionData.forEach((item) => {
      const { emotion } = item;
      if (emotionCounts[emotion]) {
        emotionCounts[emotion] += 1;
      } else {
        emotionCounts[emotion] = 1;
      }
    });

    setEmotionCount(emotionCounts);
  };

  // Chama a função de cálculo após carregar o JSON
  useEffect(() => {
    calculateEmotionPercentages();
  }, []);

  // Atualiza as emoções enquanto o vídeo está sendo reproduzido
  useEffect(() => {
    if (!videoFile) return;

    const updateEmotion = () => {
      const currentTime = Math.floor(videoRef.current.currentTime);  // Obtém o tempo atual do vídeo
      const emotionAtTime = emotionData.find(
        (item) => item.time === currentTime
      );

      if (emotionAtTime && selectedEmotions.includes(emotionAtTime.emotion)) {
        setCurrentEmotion(`${currentTime}s: ${emotionAtTime.emotion}`);
      } else {
        setCurrentEmotion(`${currentTime}s: Nenhuma emoção detectada`);
      }
    };

    const videoElement = videoRef.current;
    videoElement.addEventListener("timeupdate", updateEmotion);

    return () => {
      videoElement.removeEventListener("timeupdate", updateEmotion);
    };
  }, [videoFile, selectedEmotions]);

  // Preparando os dados para o gráfico de doughnut
  const emotionLabels = Object.keys(emotionCount);
  const emotionValues = Object.values(emotionCount);

  const chartData = {
    labels: emotionLabels,
    datasets: [
      {
        label: "Distribuição de Emoções",
        data: emotionValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(201, 203, 207, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="speakeasy-layout">
      <Navbar />
      <div className="content-wrapper">
        <div className="side-panel">
          <div className="form-area">
            <div className="title-area">
              <h5>Carregue o vídeo e escolha as emoções que deseja filtrar:</h5>
            </div>

            <form className="emotion-filter">
              {/* Botão para carregar vídeo */}
              <input
                type="file"
                accept="video/mp4"
                onChange={handleVideoUpload}
                className="btn btn-primary"
              />

              {/* Checkboxes de 7 emoções */}
              <div>
                <input
                  type="checkbox"
                  name="emotion"
                  value="Angry"
                  onChange={handleEmotionChange}
                />
                <label htmlFor="angry">Raiva (Angry)</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="emotion"
                  value="Disgust"
                  onChange={handleEmotionChange}
                />
                <label htmlFor="disgust">Nojo (Disgust)</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="emotion"
                  value="Fear"
                  onChange={handleEmotionChange}
                />
                <label htmlFor="fear">Medo (Fear)</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="emotion"
                  value="Happy"
                  onChange={handleEmotionChange}
                />
                <label htmlFor="happy">Felicidade (Happy)</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="emotion"
                  value="Neutral"
                  onChange={handleEmotionChange}
                />
                <label htmlFor="neutral">Neutro (Neutral)</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="emotion"
                  value="Sad"
                  onChange={handleEmotionChange}
                />
                <label htmlFor="sad">Tristeza (Sad)</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="emotion"
                  value="Surprise"
                  onChange={handleEmotionChange}
                />
                <label htmlFor="surprise">Surpresa (Surprise)</label>
              </div>

              {/* Botão Play */}
              <button type="button" className="btn btn-primary">
                Play!
              </button>
            </form>
          </div>
        </div>

        <div className="scrollable-content">
          <div className="video-section">
            {/* Exibição do vídeo carregado */}
            {videoFile ? (
              <div>
                <video width="700" controls ref={videoRef}>
                  <source
                    src={URL.createObjectURL(videoFile)}
                    type="video/mp4"
                  />
                </video>
                <div id="emotion-span">
                  <span>{currentEmotion}</span>
                </div>
              </div>
            ) : (
              <p>Nenhum vídeo carregado.</p>
            )}
          </div>
          <div className="video-section">
            <div id="title-area">
            <h2>Conclusão</h2>
            </div>
  {videoFile ? (
    <div className="doughnut-chart">
      <Doughnut data={chartData} />
    </div>
  ) : (
    <p>Carregue o vídeo para ver a distribuição de emoções.</p>  
  )}
</div>
        </div>
      </div>
    </div>
  );
};

export default SpeakEasy;