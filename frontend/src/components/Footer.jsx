import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} Estratega 5.0 con IA. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="#privacy">Privacidad</a>
          <span className="separator">•</span>
          <a href="#terms">Términos</a>
          <span className="separator">•</span>
          <a href="#contact">Contacto</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
