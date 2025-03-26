import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface Area {
    area_id: number;
    area_name: string;
}

interface SelectAreasProps {
    onSelect: (area_id: number) => void;
}

const fetchAreas = async (apiUrl: string): Promise<Area[]> => {
    const response = await axios.get(`${apiUrl}/areas`);
    return response.data;
};

const SelectAreas: React.FC<SelectAreasProps> = ({ onSelect }) => {
    const [areas, setAreas] = useState<Area[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const areasData = await fetchAreas(apiUrl);
            setAreas(areasData);
            setError(null);
        } catch (error) {
            const errorMessage = axios.isAxiosError(error) ? (error.response?.data?.error || error.message) : 'Unexpected error occurred';
            setError(`Error fetching areas: ${errorMessage}`);
            console.error('Error fetching areas:', errorMessage);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Seleccionar Área</h2>
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <div className="row justify-content-center">
                {areas.map((area) => (
                    <div key={area.area_id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                        <button
                            className="btn btn-primary w-100 text-capitalize"
                            onClick={() => onSelect(area.area_id)}
                        >
                            {area.area_name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectAreas;
