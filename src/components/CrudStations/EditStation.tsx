import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditStation: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [nameStation, setNameStation] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(`${apiUrl}/stations/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setNameStation(data.name_station);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id]);

    const validateInput = (input: string) => {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]{3,}$/;
        return regex.test(input);
    };

    const normalizeInput = (input: string) => {
        return input.trim().toLowerCase();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const normalizedNameStation = normalizeInput(nameStation);
        if (!validateInput(normalizedNameStation)) {
            setError('El nombre de la estación debe tener al menos 3 letras y solo puede contener letras.');
            return;
        }

        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(`${apiUrl}/stations/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name_station: normalizedNameStation }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                navigate(`/admin/stations/${data.model_asset_id}`);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        console.log('Estación editada:', normalizedNameStation);
    };

    return (
        <div className="container mt-5">
            <h2>Editar Estación</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nameStation">Nombre de la estación</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nameStation"
                        value={nameStation}
                        onChange={(e) => {
                            setNameStation(e.target.value);
                            setError('');
                        }}
                        required
                    />
                    {error && <div className="text-danger mt-2">{error}</div>}
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default EditStation;