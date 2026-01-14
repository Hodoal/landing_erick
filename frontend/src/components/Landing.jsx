import React, { useState, useEffect } from 'react';
import './Landing.css';
import Footer from './Footer';

function Landing({ onOpenForm }) {
  const [viewers, setViewers] = useState(152);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="landing">
      <div className="landing-header">
        <h1 className="landing-title">
          <span className="asegura">ASEGURA</span> EL FUTURO DE TU AGENCIA HOY MISMO CONVIRTIENDOTE EN UN ESTRATEGA 5.0 UTILIZANDO <span className="ia">IA</span>
        </h1>
      </div>

      <div className="landing-content">
        <div className="video-section">
          <h2 className="step-title">PASO 1: MIRA EL VIDEO</h2>
          <div className="video-container">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="VSL Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="video-stats">
            <span className="viewers">{viewers} 🟢 Personas viendo ahora.</span>
          </div>

          <div className="step-info">
            <p><span className="step-2">PASO 2:</span> Agenda tu llamada de consultoría (APLICA SOLO PARA AGENCIAS DE MARKETING O TRAFFICKER)</p>
          </div>

          <button className="cta-button" onClick={onOpenForm}>
            ¡QUIERO AGENDAR UNA LLAMADA AHORA!
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Landing;
