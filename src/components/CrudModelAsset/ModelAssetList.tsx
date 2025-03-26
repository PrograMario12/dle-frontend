import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

interface ModelAsset {
    model_asset_id: number;
    model_asset_name: string;
    area_asset_id: number;
}

const ModelAssetList = () => {
    const [modelAssets, setModelAssets] = useState<ModelAsset[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { area_asset_id } = useParams<{ area_asset_id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchModelAssets();
    }, [area_asset_id]);

    const fetchModelAssets = async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const response = await axios.get(`${apiUrl}/model-assets/area-asset/${area_asset_id}`);
            setModelAssets(response.data);
            setError(null);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.error || error.message;
                setError(errorMessage);
                console.error('Error fetching model assets:', errorMessage);
            } else {
                setError('Unexpected error occurred');
                console.error('Unexpected error:', error);
            }
        }
    };

    const handleDelete = async (model_asset_id: number) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            await axios.delete(`${apiUrl}/model-assets/${model_asset_id}`);
            setModelAssets(prevModelAssets => prevModelAssets.filter(modelAsset => modelAsset.model_asset_id !== model_asset_id));
            setError(null);
        } catch (error) {
            const errorMessage = axios.isAxiosError(error) ? (error.response?.data?.error || 'Error deleting model asset') : 'Unexpected error occurred';
            setError(errorMessage);
            console.error('Error deleting model asset:', errorMessage);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Modelos de Activo</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <button className="btn btn-secondary mb-3" onClick={() => navigate(`/admin/area-assets/${area_asset_id}`)}>
                Regresar a Activos de Área
            </button>
            <Link to={`/admin/new-model-asset/${area_asset_id}`} className="btn btn-primary mb-3 ms-2">
                Agregar Modelo
            </Link>
            <ul className="list-group">
                {modelAssets.map((modelAsset) => (
                    <li
                        key={modelAsset.model_asset_id}
                        className="list-group-item text-capitalize d-flex justify-content-between align-items-center"
                    >
                        <span className="me-3">
                            <Link to={`/admin/stations/${modelAsset.model_asset_id}`} className="text-decoration-none">
                                {modelAsset.model_asset_name}
                            </Link>
                        </span>
                        <div>
                            <Link
                                to={`/admin/edit-model-asset/${modelAsset.model_asset_id}`}
                                className="btn btn-secondary btn-sm me-2"
                            >
                                Editar
                            </Link>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                    if (window.confirm('¿Está seguro de que desea eliminar este modelo de activo?')) {
                                        handleDelete(modelAsset.model_asset_id);
                                    }
                                }}
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ModelAssetList;