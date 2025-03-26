import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RegisterStation: React.FC = () => {
    const { cardNumber } = useParams<{ cardNumber: string }>();
    const line = localStorage.getItem('selectedModelAssetId');
    const navigate = useNavigate(); // Hook para redirigir

    const [stations, setStations] = useState<{ [station: string]: string[] }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!line) {
            setError('No line selected');
            setLoading(false);
            return;
        }

        // Llamada a la API para obtener las estaciones y posiciones
        const fetchStations = async () => {
            try {
                const response = await fetch(`/api/stations?modelAssetId=${line}`);
                if (!response.ok) {
                    throw new Error('Error al obtener las estaciones');
                }
                const data = await response.json();
                setStations(data); // Actualizar el estado con las estaciones obtenidas
                setLoading(false);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Error desconocido');
                }
                setLoading(false);
            }
        };

        fetchStations();
    }, [line]);

    if (loading) {
        return <p className="text-center">Cargando estaciones...</p>;
    }

    if (error) {
        return (
            <div className="text-center">
                <p>Error: {error}</p>
                <button className="btn btn-danger" onClick={() => navigate('/')}>
                    Volver
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center">{line}</h2>
            <p className="text-center">Selecciona tu posición</p>
            <div className="row">
                {Object.entries(stations).map(([station, positions], index) => (
                    <div className="col-12 col-md-6 d-flex flex-column align-items-center mb-4" key={index}>
                        <div
                            className="bg-primary text-white d-flex flex-column align-items-center justify-content-center"
                            style={{
                                width: '100%',
                                maxWidth: '600px',
                                height: 'auto',
                                padding: '20px',
                                fontSize: '24px',
                                textAlign: 'center',
                                borderRadius: '8px',
                            }}
                        >
                            <div>{station}</div>
                            <div className="d-flex flex-wrap justify-content-center mt-3">
                                {positions.map((position, posIndex) => (
                                    <button
                                        key={posIndex}
                                        className="btn btn-secondary m-1"
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            fontSize: '18px',
                                            textAlign: 'center',
                                            border: '2px solid #fff',
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                        }}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.transform = 'scale(1.1)')
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.transform = 'scale(1)')
                                        }
                                    >
                                        {position}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-4">
                <button
                    className="btn btn-danger"
                    style={{
                        width: '200px',
                        height: '50px',
                        fontSize: '18px',
                    }}
                    onClick={() => navigate('/')}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default RegisterStation;
