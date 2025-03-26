import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/CardScanner.css';
import Logo from './Logo';

const CardScanner: React.FC = () => {
  const [cardNumber, setCardNumber] = useState(''); // Almacena el número real
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook para redirigir

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Validar que solo se ingresen números
    if (!/^\d*$/.test(value)) {
      setError('Solo se permiten números.');
      return;
    }

    // Permitir hasta 10 caracteres
    if (value.length <= 10) {
      setCardNumber(value); // Actualizar el valor real ingresado
      setError(null); // Limpiar el error mientras se ingresa
    }

    // Validar si se han ingresado exactamente 10 caracteres
    if (value.length === 10) {
      setError(null); // Limpiar el error si la validación pasa
      navigate(`/register-station/${value}`); // Redirigir al componente RegisterStation con el número
    } else if (value.length > 10) {
      setError('El número de tarjeta debe tener exactamente 10 dígitos.');
    }
  };

  return (
    <div className="card-scanner card p-3 ">
      <div className="card-body bg-light">
        <Logo />
        <h5 className="card-title">Escanea tu tarjeta</h5>
        <input
          type="password" // Ocultar los caracteres ingresados
          className="form-control"
          placeholder="Número de tarjeta"
          autoComplete="off"
          inputMode="numeric" // Sugerir teclado numérico en dispositivos móviles
          value={cardNumber} // Almacenar el valor real ingresado
          onChange={handleInputChange} // Validar el valor ingresado
        />
        {error && <div className="text-danger mt-2">{error}</div>} {/* Mostrar mensaje de error */}
      </div>
    </div>
  );
};

export default CardScanner;
