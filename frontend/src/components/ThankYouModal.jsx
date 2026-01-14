import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './ThankYouModal.css';

function ThankYouModal({ onClose }) {
  return (
    <div className="thankyou-overlay" onClick={onClose}>
      <div className="thankyou-content" onClick={(e) => e.stopPropagation()}>
        <button className="thankyou-close" onClick={onClose}>×</button>

        <div className="thankyou-header">
          <h1>Ya estás un paso más adelante de ser un estratega 5.0</h1>
          <p className="thankyou-subtitle">Pronto nos pondremos en contacto contigo.</p>
        </div>

        <div className="thankyou-video-container">
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

        <div className="whatsapp-card">
          <FaWhatsapp className="whatsapp-logo" />
          <div>
            <h2 className="whatsapp-header-title">REVISA TU WHATSAPP</h2>
            <p className="whatsapp-text">
              Revisa tu WhatsApp para confirmar tu asesoría personalizada por <strong>Zoom</strong> con nuestro equipo. También <strong>te llamaremos</strong> para asegurarte de que todo esté listo.
            </p>
          </div>
        </div>

        <button className="thankyou-button" onClick={onClose}>Entendido</button>
      </div>
    </div>
  );
}

export default ThankYouModal;
