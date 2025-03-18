// Footer.tsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';

const Footer: React.FC = () => {
  const { hasPermission, line } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    if (hasPermission) {
      navigate('/config');
    } else {
      alert('No tienes permisos para acceder a esta configuración.');
    }
  };

  return (
    <footer className="footer bg-dark text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <p className="mb-0">{line}</p>
        <div className="buttons">
          <button className="btn btn-primary mx-2" onClick={handleSettingsClick}>
            <i className="bi bi-gear"></i>
          </button>
          <button className="btn btn-secondary mx-2">
            <i className="bi bi-bar-chart-line"></i>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
