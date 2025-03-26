import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

interface Side {
    side_id: number;
    station_id: number;
    employee_necessary: number;
    type_side_desc: string;
}

const SideList = () => {
    const [sides, setSides] = useState<Side[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { station_id } = useParams<{ station_id: string }>();

    console.log('station_id:', station_id);
    const navigate = useNavigate();

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        axios.get(`${apiUrl}/sides/station/${station_id}`)
            .then(response => {
                console.log('Fetched sides:', response.data);
                setSides(response.data);
                setError(null);
            })
            .catch(error => {
                if (axios.isAxiosError(error)) {
                    const errorMessage = error.response?.data?.error || error.message;
                    setError(errorMessage);
                    console.error('Error fetching sides:', errorMessage);
                } else {
                    setError('Unexpected error occurred');
                    console.error('Unexpected error:', error);
                }
            });
    }, [station_id]);

    const handleDelete = (side_id: number): void => {
        const apiUrl = import.meta.env.VITE_API_URL;
        axios.delete(`${apiUrl}/sides/${side_id}`)
            .then(() => {
                setSides(prevSides => prevSides.filter(side => side.side_id !== side_id));
                setError(null);
            })
            .catch(error => {
                const errorMessage = error.response?.data?.error || 'Error deleting side';
                setError(errorMessage);
                console.error('Error deleting side:', errorMessage);
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Posiciones</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <button className="btn btn-secondary mb-3" onClick={() => navigate(`/admin/stations/${station_id}`)}>
                Regresar a Estaciones
            </button>
            <Link to={`/admin/new-side/${station_id}`} className="btn btn-primary mb-3 ms-2">
                Agregar Posición
            </Link>
            <ul className="list-group">
                {sides.map((side) => (
                    <li
                        key={side.side_id}
                        className="list-group-item text-capitalize d-flex justify-content-between align-items-center"
                    >
                        <div>
                            <span className="me-3">{side.type_side_desc}</span>
                            <span className="badge bg-primary me-3">Empleados necesarios: {side.employee_necessary}</span>
                        </div>
                        <div>
                            <Link
                                to={`/admin/edit-side/${side.side_id}`}
                                className="btn btn-secondary btn-sm me-2"
                            >
                                Editar
                            </Link>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                    if (window.confirm('¿Está seguro de que desea eliminar esta posición?')) {
                                        handleDelete(side.side_id);
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

export default SideList;