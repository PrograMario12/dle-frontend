import React from 'react';
import logo from '../../assets/img/magna-logo.png';
import '../../assets/styles/Logo.css'; // Asegúrate de crear este archivo CSS

const Logo: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <img src={logo} alt="Logo" className="img-fluid logo-img" />
    </div>
  );
};

export default Logo;
