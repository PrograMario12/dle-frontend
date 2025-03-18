import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

interface AreaAsset {
    area_asset_id: number;
    area_asset_name: string;
    area_asset_number: number;
    area_name: string;
}

const AreaAssetList = () => {
    const [areaAssets, setAreaAssets] = useState<AreaAsset[]>([]);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        axios.get(`${apiUrl}/area-assets/area/${id}`)
            .then(response => {
                console.log('Fetched area assets:', response.data);
                setAreaAssets(response.data);
            })
            .catch(error => console.error('Error fetching area assets:', error));
    }, [id]);

    const handleDelete = (area_asset_id: number): void => {
        const apiUrl = import.meta.env.VITE_API_URL;
        axios.delete(`${apiUrl}/area-assets/${area_asset_id}`)
            .then(() => {
                setAreaAssets(prevAreaAssets => prevAreaAssets.filter(areaAsset => areaAsset.area_asset_id !== area_asset_id));
            })
            .catch(error => console.error('Error deleting area asset:', error));
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Activos de área {areaAssets[0]?.area_name}</h2>
            <button className="btn btn-secondary mb-3" onClick={() => navigate('/admin')}>
                Regresar a Áreas
            </button>
            <Link to={`/admin/new-area-asset/${id}`} className="btn btn-primary mb-3 ms-2">
                Agregar activo
            </Link>
            <ul className="list-group">
                {areaAssets.map((areaAsset) => (
                    <li
                        key={areaAsset.area_asset_id}
                        className="list-group-item text-capitalize d-flex justify-content-between align-items-center"
                    >
                        <span className="me-3">
                            <Link 
                                to={`/admin/model-assets/${areaAsset.area_asset_id}`} 
                                className="text-decoration-none"
                            >
                                {areaAsset.area_asset_name} {areaAsset.area_asset_number}
                            </Link>
                        </span>
                        <div>
                            <Link
                                to={`/admin/edit-area-asset/${areaAsset.area_asset_id}`}
                                className="btn btn-secondary btn-sm me-2"
                            >
                                Editar
                            </Link>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                    if (window.confirm('¿Está seguro de que desea eliminar este activo?')) {
                                        handleDelete(areaAsset.area_asset_id);
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

export default AreaAssetList;
