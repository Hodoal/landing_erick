import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolleando hacia abajo
        setIsVisible(false);
      } else {
        // Scrolleando hacia arriba o en la parte superior
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
      <div className="navbar-content">
        <span>Domina la <strong>Inteligencia Artificial</strong> este 2026</span>
      </div>
    </nav>
  );
}

export default Navbar;
