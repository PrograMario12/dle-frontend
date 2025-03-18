import React from 'react';
import '../../assets/styles/CardScanner.css';
import Logo from './Logo';

const CardScanner: React.FC = () => {
  return (
    <div className="card-scanner card p-3 ">
      <div className="card-body bg-light">
      <Logo />
        <h5 className="card-title">Escanea tu tarjeta</h5>
        <input type="text" className="form-control" placeholder="Número de tarjeta" />
      </div>
    </div>
  );
};

export default CardScanner;
