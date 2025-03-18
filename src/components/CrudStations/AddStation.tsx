import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddStation: React.FC = () => {
    const { model_asset_id } = useParams<{ model_asset_id: string }>();
    const [nameStation, setNameStation] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateInput = (input: string) => {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]{1,}$/;
        return regex.test(input);
    };

    const normalizeInput = (input: string) => {
        return input.trim().toLowerCase();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const normalizedNameStation = normalizeInput(nameStation);
        if (!validateInput(normalizedNameStation)) {
            setError('El nombre de la estación debe tener mínimo 1 carácter');
            return;
        }

        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(`${apiUrl}/stations/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model_asset_id, name_station: normalizedNameStation }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                navigate(`/admin/stations/${model_asset_id}`);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        console.log('Estación agregada:', { model_asset_id, normalizedNameStation });
    };

    return (
        <div className="container mt-5">
            <h2>Agregar Estación</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nameStation">Nombre de la Estación</label>
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
                    Agregar
                </button>
            </form>
        </div>
    );
};

export default AddStation;