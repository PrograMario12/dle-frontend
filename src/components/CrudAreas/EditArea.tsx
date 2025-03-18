import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditArea: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(`${apiUrl}/areas/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setName(data.area_name);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id]);

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
        fetch(`${apiUrl}/areas/${id}`, {
            method: 'PUT',
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

        console.log('Área editada:', normalizedName);
    };

    return (
        <div className="container mt-5">
            <h2>Editar Área</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre del área</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        placeholder={name} 
                        onChange={(e) => {
                            setName(e.target.value);
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

export default EditArea;