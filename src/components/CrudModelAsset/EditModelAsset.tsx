import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditModelAsset: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [modelName, setModelName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(`${apiUrl}/model-assets/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setModelName(data.model_asset_name);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id]);

    const validateInput = (input: string) => {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{3,}$/;
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
        fetch(`${apiUrl}/model-assets/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model_asset_name: normalizedModelName }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                navigate(`/admin/model-assets/${data.area_asset_id}`);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        console.log('Modelo de activo editado:', normalizedModelName);
    };

    return (
        <div className="container mt-5">
            <h2>Editar Modelo de Activo</h2>
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
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default EditModelAsset;