import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface TypeSideOption {
    type_side_id: number;
    type_side_desc: string;
}

const EditSide: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [sideDesc, setSideDesc] = useState('');
    const [employeeNecessary, setEmployeeNecessary] = useState<number>(1);
    const [station_id, setStationId] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [typeSideOptions, setTypeSideOptions] = useState<TypeSideOption[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;

        const fetchSideData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/sides/${id}`);
                const data = response.data;
                setSideDesc(data.side_desc);
                setEmployeeNecessary(data.employee_necessary);
                setStationId(data.station_id);
                setError(null);
            } catch (error) {
                const errorMessage = axios.isAxiosError(error) ? (error.response?.data?.error || error.message) : 'Unexpected error occurred';
                setError(`Error fetching side data: ${errorMessage}`);
                console.error('Error fetching side data:', errorMessage);
            }
        };

        const fetchTypeSideOptions = async () => {
            try {
                const response = await axios.get(`${apiUrl}/sides/types`);
                setTypeSideOptions(response.data);
                setError(null);
            } catch (error) {
                const errorMessage = axios.isAxiosError(error) ? (error.response?.data?.error || error.message) : 'Unexpected error occurred';
                setError(`Error fetching type side options: ${errorMessage}`);
                console.error('Error fetching type side options:', errorMessage);
            }
        };

        fetchSideData();
        fetchTypeSideOptions();
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
            .then(() => {
                navigate(`/admin/sides/${station_id}`);
            })
            .catch((error) => {
                const errorMessage = axios.isAxiosError(error) ? (error.response?.data?.error || error.message) : 'Unexpected error occurred';
                setError(`Error updating side: ${errorMessage}`);
                console.error('Error updating side:', errorMessage);
            });
    };

    return (
        <div className="container mt-5">
            <h2>Editar Posición</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="sideDesc">Descripción de la Posición</label>
                    <select
                        className="form-control"
                        id="sideDesc"
                        value={sideDesc}
                        onChange={(e) => {
                            setSideDesc(e.target.value);
                            setError(null);
                        }}
                        required
                    >
                        <option value="">Seleccione un tipo de lado</option>
                        {typeSideOptions.map((option) => (
                            <option key={option.type_side_id} value={option.type_side_id}>
                                {option.type_side_desc}
                            </option>
                        ))}
                    </select>
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