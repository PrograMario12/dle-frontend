import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddAreaAsset: React.FC = () => {
    const { area_id } = useParams<{ area_id: string }>();
    const [typeAsset, setTypeAsset] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateInput = (input: string) => {
        const regex = /^[0-9]{1,}$/;
        return regex.test(input);
    };

    const [typeAssets, setTypeAssets] = useState<{ area_asset_id: number; area_asset_name: string }[]>([]);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(`${apiUrl}/area-assets/type-asset`)
            .then((response) => response.json())
            .then((data) => {
                setTypeAssets(data);
            })
            .catch((error) => {
                console.error('Error fetching type assets:', error);
            });
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateInput(description)) {
            setError('El campo debe tener tener al menos un número');
            return;
        }

        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(`${apiUrl}/area-assets/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ area_id, area_type_asset: typeAsset, area_asset_number: description }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                navigate(`/admin/area-assets/${area_id}`);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="container mt-5">
            <h2>Agregar Activo de Área</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="typeAsset">Tipo de Activo</label>
                    <select
                        className="form-control text-capitalize"
                        id="typeAsset"
                        value={typeAsset}
                        onChange={(e) => {
                            setTypeAsset(e.target.value);
                            setError('');
                        }}
                        required
                    >
                        <option value="">Seleccione un tipo de activo</option>
                        {typeAssets.map((asset) => (
                            <option key={asset.area_asset_id} value={asset.area_asset_id}>
                                {asset.area_asset_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Número del activo</label>
                    <input
                        type="number"
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
                    Agregar
                </button>
            </form>
        </div>
    );
};

export default AddAreaAsset;