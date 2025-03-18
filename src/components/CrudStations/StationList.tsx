import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

interface Station {
    station_id: number;
    name_station: string;
    model_asset_id: number;
}

const StationList = () => {
    const [stations, setStations] = useState<Station[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { model_asset_id } = useParams<{ model_asset_id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        axios.get(`${apiUrl}/stations/model-asset/${model_asset_id}`)
            .then(response => {
                console.log('Fetched stations:', response.data);
                setStations(response.data);
                setError(null);
            })
            .catch(error => {
                if (axios.isAxiosError(error)) {
                    const errorMessage = error.response?.data?.error || error.message;
                    setError(errorMessage);
                    console.error('Error fetching stations:', errorMessage);
                } else {
                    setError('Unexpected error occurred');
                    console.error('Unexpected error:', error);
                }
            });
    }, [model_asset_id]);

    const handleDelete = (station_id: number): void => {
        const apiUrl = import.meta.env.VITE_API_URL;
        axios.delete(`${apiUrl}/stations/${station_id}`)
            .then(() => {
                setStations(prevStations => prevStations.filter(station => station.station_id !== station_id));
                setError(null);
            })
            .catch(error => {
                const errorMessage = error.response?.data?.error || 'Error deleting station';
                setError(errorMessage);
                console.error('Error deleting station:', errorMessage);
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Estaciones</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <button className="btn btn-secondary mb-3" onClick={() => navigate(`/admin`)}>
                Regresar a áreas
            </button>
            <Link to={`/admin/new-station/${model_asset_id}`} className="btn btn-primary mb-3 ms-2">
                Agregar Estación
            </Link>
            <ul className="list-group">
                {stations.map((station) => (
                    <li
                        key={station.station_id}
                        className="list-group-item text-capitalize d-flex justify-content-between align-items-center"
                    >
                        <span className="me-3">
                            <Link to={`/admin/sides/${station.station_id}`} className="text-decoration-none">
                                {station.name_station}
                            </Link>
                        </span>
                        <div>
                            <Link
                                to={`/admin/edit-station/${station.station_id}`}
                                className="btn btn-secondary btn-sm me-2"
                            >
                                Editar
                            </Link>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                    if (window.confirm('¿Está seguro de que desea eliminar esta estación?')) {
                                        handleDelete(station.station_id);
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

export default StationList;