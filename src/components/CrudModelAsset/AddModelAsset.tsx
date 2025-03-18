import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddModelAsset: React.FC = () => {
    const { area_asset_id } = useParams<{ area_asset_id: string }>();
    const [modelName, setModelName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateInput = (input: string) => {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]{3,}$/;
        return regex.test(input);
    };

    const normalizeInput = (input: string) => {
        return input.trim().toLowerCase();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const normalizedModelName = normalizeInput(modelName);
        if (!validateInput(normalizedModelName)) {
            setError('El nombre del modelo debe tener al menos 3 letras y solo puede contener letras.');
            return;
        }

        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(`${apiUrl}/model-assets/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ area_asset_id, model_asset_name: normalizedModelName }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                navigate(`/admin/model-assets/${area_asset_id}`);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        console.log('Modelo de activo agregado:', { area_asset_id, normalizedModelName });
    };

    return (
        <div className="container mt-5">
            <h2>Agregar Modelo de Activo</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="modelName">Nombre del Modelo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="modelName"
                        value={modelName}
                        onChange={(e) => {
                            setModelName(e.target.value);
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

export default AddModelAsset;