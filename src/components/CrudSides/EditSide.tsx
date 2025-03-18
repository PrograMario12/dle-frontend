import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditSide: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [sideDesc, setSideDesc] = useState('');
    const [employeeNecessary, setEmployeeNecessary] = useState<number>(1);
    const[station_id, setStationId] = useState<number>(0);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(`${apiUrl}/sides/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setSideDesc(data.side_desc);
                setEmployeeNecessary(data.employee_necessary);+
                setStationId(data.station_id);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id]);

    const validateInput = (input: string) => {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]{1,}$/;
        return regex.test(input);
    };

    const normalizeInput = (input: string) => {
        return input.trim().toLowerCase();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const normalizedSideDesc = normalizeInput(sideDesc);
        if (!validateInput(normalizedSideDesc)) {
            setError('La descripción de la posición debe tener al menos 1 carácter alfanumérico');
            return;
        }

        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(`${apiUrl}/sides/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ side_desc: normalizedSideDesc, employee_necessary: employeeNecessary }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                navigate(`/admin/sides/${station_id}`);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        console.log('Posición editada:', normalizedSideDesc, employeeNecessary);
    };

    return (
        <div className="container mt-5">
            <h2>Editar Posición</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="sideDesc">Descripción de la Posición</label>
                    <input
                        type="text"
                        className="form-control"
                        id="sideDesc"
                        value={sideDesc}
                        onChange={(e) => {
                            setSideDesc(e.target.value);
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
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default EditSide;