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
    const { area_asset_id } = useParams<{ area_asset_id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        axios.get(`${apiUrl}/model-assets/area-asset/${area_asset_id}`)
            .then(response => {
                console.log('Fetched model assets:', response.data);
                setModelAssets(response.data);
            })
            .catch(error => console.error('Error fetching model assets:', error));
    }, [area_asset_id]);

    const handleDelete = (model_asset_id: number): void => {
        const apiUrl = import.meta.env.VITE_API_URL;
        axios.delete(`${apiUrl}/model-assets/${model_asset_id}`)
            .then(() => {
                setModelAssets(prevModelAssets => prevModelAssets.filter(modelAsset => modelAsset.model_asset_id !== model_asset_id));
            })
            .catch(error => console.error('Error deleting model asset:', error));
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Modelos de Activo</h2>
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