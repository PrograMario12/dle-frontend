import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface TypeSideOption {
    type_side_id: number;
    type_side_desc: string;
}

const AddSide: React.FC = () => {
    const { station_id } = useParams<{ station_id: string }>();
    const [sideDesc, setSideDesc] = useState('');
    const [employeeNecessary, setEmployeeNecessary] = useState<number>(1);
    const [error, setError] = useState('');
    const [typeSideOptions, setTypeSideOptions] = useState<TypeSideOption[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTypeSideOptions = async () => {
            const apiUrl = import.meta.env.VITE_API_URL;
            try {
                const response = await axios.get(`${apiUrl}/sides/types`);
                setTypeSideOptions(response.data);
            } catch (error) {
                console.error('Error fetching type side options:', error);
                setError('Error al cargar las opciones de tipo de lado');
            }
        };

        fetchTypeSideOptions();
    }, []);

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
            setError('La descripción de la posición debe tener mínimo un carácter alfanumérico');
            return;
        }

        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(`${apiUrl}/sides/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ station_id, type_side_id: normalizedSideDesc, employee_necessary: employeeNecessary }),
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
                    <label htmlFor="sideDesc">Descripción de la Posición</label>
                    <select
                        className="form-control"
                        id="sideDesc"
                        value={sideDesc}
                        onChange={(e) => {
                            setSideDesc(e.target.value);
                            setError('');
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
                    Agregar
                </button>
            </form>
        </div>
    );
};

export default AddSide;