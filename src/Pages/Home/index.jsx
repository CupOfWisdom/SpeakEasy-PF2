import React from 'react';
import './style.css';
import Navbar from '../../Components/Navbar';

const SpeakEasy = () => {
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
                    <button className="btn btn-primary">Carregar vídeo</button>
                    <div>
                    <input type="radio" name="emotion" id="felicidade" />
                    <label htmlFor="felicidade">Felicidade</label>
                    </div>
                    <div>
                    <input type="radio" name="emotion" id="tristeza" />
                    <label htmlFor="tristeza">Tristeza</label>
                    </div>
                    <div>
                    <input type="radio" name="emotion" id="raiva" />
                    <label htmlFor="raiva">Raiva</label>
                    </div>
                    <div>
                    <input type="radio" name="emotion" id="medo" />
                    <label htmlFor="medo">Medo</label>
                    </div>
                    <div>
                    <input type="radio" name="emotion" id="neutro" />
                    <label htmlFor="neutro">Neutro</label>
                    </div>
                    <div>
                    <input type="radio" name="emotion" id="nojo" />
                    <label htmlFor="nojo">Nojo</label>
                    </div>
                    <div>
                    <input type="radio" name="emotion" id="surpreso" />
                    <label htmlFor="surpreso">Surpreso</label>
                    </div>
                    <button className="btn btn-primary">Play!</button>
                </form>
            </div>
            
          
        </div>

        <div className="scrollable-content">
          <div className="video-section">
            {/* Aqui você pode inserir o vídeo ou conteúdo desejado */}
          </div>
          <div className="block">
            {/* Bloco 2 */}
          </div>
          <div className="block">
            <h5>Conclusão</h5>
            {/* Bloco 3: Conclusão */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakEasy;
