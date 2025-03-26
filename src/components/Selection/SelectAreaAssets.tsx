import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface AreaAsset {
  area_asset_id: number;
  area_asset_name: string;
  area_asset_number: number;
}

const SelectAreaAssets: React.FC = () => {
    const { area_id } = useParams<{ area_id: string }>();
    const [areaAssets, setAreaAssets] = useState<AreaAsset[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAreaAssets = async () => {
            const apiUrl = import.meta.env.VITE_API_URL;
            try {
                const response = await axios.get(`${apiUrl}/area-assets/area/${area_id}`);
                setAreaAssets(response.data);
                setError(null);
            } catch (error) {
                const errorMessage = axios.isAxiosError(error) ? (error.response?.data?.error || error.message) : 'Unexpected error occurred';
                setError(`Error fetching area assets: ${errorMessage}`);
                console.error('Error fetching area assets:', errorMessage);
            }
        };

        fetchAreaAssets();
    }, [area_id]);

    const handleAreaAssetSelect = (area_asset_id: number) => {
        navigate(`/config/model-assets/${area_asset_id}`);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Seleccionar Activo de Área</h2>
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <div className="list-group">
                {areaAssets.map((asset) => (
                    <button
                        key={asset.area_asset_id}
                        className="list-group-item list-group-item-action text-capitalize"
                        onClick={() => handleAreaAssetSelect(asset.area_asset_id)}
                    >
                        {asset.area_asset_name} {asset.area_asset_number}
                    </button>
                ))}
            </div>
            <div className="text-center mt-3">
                <button className="btn btn-secondary" onClick={() => navigate('/config')}>
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default SelectAreaAssets;