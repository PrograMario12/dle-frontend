import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddArea: React.FC = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateName = (name: string) => {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ]{3,}$/;
        return regex.test(name);
    };

    const normalizeName = (name: string) => {
        return name.trim().toLowerCase();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const normalizedName = normalizeName(name);
        if (!validateName(normalizedName)) {
            setError('El nombre debe tener al menos 3 letras y solo puede contener letras.');
            return;
        }

        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(`${apiUrl}/areas/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: normalizedName }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                navigate('/admin');
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        console.log('Área agregada:', normalizedName);
    };

    return (
        <div className="container mt-5">
            <h2>Agregar Área</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre del Área</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError('');
                        }}
                        required
                    />
                    {error && <div className="text-danger mt-2">{error}</div>}
                </div>
                <div className="d-flex justify-content-between mt-3">
                <button type="button" className="btn btn-secondary ml-2" onClick={() => navigate('/admin')}>
                        Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Agregar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddArea;
