import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddSide: React.FC = () => {
    const { station_id } = useParams<{ station_id: string }>();
    const [stationDesc, setStationDesc] = useState('');
    const [employeeNecessary, setEmployeeNecessary] = useState<number>(1);
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
        const normalizedSideDesc = normalizeInput(stationDesc);
        if (!validateInput(normalizedSideDesc)) {
            setError('La descripción de la posición debe tener mínimo un carácter alfanumérico');
            return;
        }

        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(`${apiUrl}/sides/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ station_id, side_desc: normalizedSideDesc, employee_necessary: employeeNecessary }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                navigate(`/admin/sides/${station_id}`);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        console.log('Posición agregada:', { station_id, normalizedSideDesc, employeeNecessary });
    };

    return (
        <div className="container mt-5">
            <h2>Agregar Posición</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="stationDesc">Descripción de la Posición</label>
                    <input
                        type="text"
                        className="form-control"
                        id="stationDesc"
                        value={stationDesc}
                        onChange={(e) => {
                            setStationDesc(e.target.value);
                            setError('');
                        }}
                        required
                    />
                    {error && <div className="text-danger mt-2">{error}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="employeeNecessary">Empleados Necesarios</label>
                    <input
                        type="number"
                        className="form-control"
                        id="employeeNecessary"
                        value={employeeNecessary}
                        onChange={(e) => setEmployeeNecessary(Number(e.target.value))}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Agregar
                </button>
            </form>
        </div>
    );
};

export default AddSide;