// ConfigPage.tsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../components/AppContext';
import SelectAreas from '../components/Selection/SelectAreas';

const ConfigPage: React.FC = () => {
  const { setLine } = useContext(AppContext);
  const navigate = useNavigate();

  const handleAreaSelect = (area_id: number) => {
    navigate(`/config/area-assets/${area_id}`);
  };

  return (
    <div className="config-page container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Configuración del kiosko</h2>
        </div>
        <div className="card-body">
          <p className="mb-4 text-muted">
            Selecciona un área para continuar con la configuración.
          </p>
          <SelectAreas onSelect={handleAreaSelect} />
        </div>
      </div>
    </div>
  );
};

export default ConfigPage;
