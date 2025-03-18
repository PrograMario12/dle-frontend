import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditAreaAsset: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(`${apiUrl}/area-assets/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setDescription(data.area_asset_number);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id]);

    const validateInput = (input: string) => {
        const regex = /^[0-9]{1,}$/;
        return regex.test(input);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateInput(description)) {
            setError('El campo solo acepta números');
            return;
        }

        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(`${apiUrl}/area-assets/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({area_asset_number: description }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                navigate('/admin');
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    };

    return (
        <div className="container mt-5">
            <h2>Editar Activo de Área</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="description">Número del Activo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
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

export default EditAreaAsset;