import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface ModelAsset {
  model_asset_id: number;
  model_asset_name: string;
}

const SelectModelAssets: React.FC = () => {
  const { area_asset_id } = useParams<{ area_asset_id: string }>();
  const [modelAssets, setModelAssets] = useState<ModelAsset[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModelAssets = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const response = await axios.get(`${apiUrl}/model-assets/area-asset/${area_asset_id}`);
        setModelAssets(response.data);
        setError(null);
      } catch (error) {
        const errorMessage = axios.isAxiosError(error) ? (error.response?.data?.error || error.message) : 'Unexpected error occurred';
        setError(`Error fetching model assets: ${errorMessage}`);
        console.error('Error fetching model assets:', errorMessage);
      }
    };

    fetchModelAssets();
  }, [area_asset_id]);

  const handleModelAssetSelect = (model_asset_id: number) => {
    localStorage.setItem('selectedModelAssetId', model_asset_id.toString());
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Seleccionar Modelo de Activo</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex flex-wrap">
        {modelAssets.map((model) => (
          <button
            key={model.model_asset_id}
            className="btn btn-primary m-2 text-capitalize"
            onClick={() => handleModelAssetSelect(model.model_asset_id)}
          >
            {model.model_asset_name}
          </button>
        ))}
      </div>
      <button className="btn btn-secondary mt-3" onClick={() => navigate(`/config/area-assets/${area_asset_id}`)}>
        Regresar a Activos de Área
      </button>
    </div>
  );
};

export default SelectModelAssets;