// ConfigPage.tsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../components/AppContext';

const ConfigPage: React.FC = () => {
  const { setLine } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLineSelect = (line: string) => {
    setLine(line);
    navigate('/');
  };

  return (
    <div className="config-page container mt-5">
      <h2 className="mb-4">Configurar Estación</h2>
      <div className="btn-group-vertical w-100" role="group" aria-label="Seleccionar línea">
        {['Línea 1', 'Línea 2', 'Línea 3', 'Línea 4', 'Línea 5', 'Línea 6', 'Línea 7'].map((line) => (
          <button
            key={line}
            className="btn btn-outline-primary mb-2"
            onClick={() => handleLineSelect(line)}
          >
            {line}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConfigPage;
