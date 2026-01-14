import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './ThankYouPage.css';

function ThankYouPage() {
  return (
    <div className="thankyou-page">
      <button className="thankyou-back-btn" onClick={() => window.location.href = '/'}>←</button>

      <div className="thankyou-page-content">
        <div className="thankyou-page-header">
          <h1>Ya estás un paso más adelante de ser un estratega 5.0</h1>
          <p className="thankyou-page-subtitle">Pronto nos pondremos en contacto contigo.</p>
        </div>

        <div className="thankyou-page-video-container">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/jNQXAC9IVRw"
            title="Segundo VSL"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="whatsapp-card-page">
          <FaWhatsapp className="whatsapp-logo-page" />
          <div>
            <h2 className="whatsapp-header-title-page">REVISA TU WHATSAPP</h2>
            <p className="whatsapp-text-page">
              Revisa tu WhatsApp para confirmar tu asesoría personalizada por <strong>Zoom</strong> con nuestro equipo. También <strong>te llamaremos</strong> para asegurarte de que todo esté listo.
            </p>
          </div>
        </div>

        <button className="thankyou-page-button" onClick={() => window.location.href = '/'}>
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}

export default ThankYouPage;
