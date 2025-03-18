// src/components/AreaList.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Area {
  area_id: number;
  area_name: string;
}

const AreaList = () => {
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios.get(`${apiUrl}/areas/`)
      .then(response => {
        console.log('Fetched areas:', response.data);
        setAreas(response.data);
      })
      .catch(error => console.error('Error fetching areas:', error));
  }, []);

  const handleDelete = (area_id: number): void => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios.delete(`${apiUrl}/areas/${area_id}`)
      .then(() => {
        setAreas(prevAreas => prevAreas.filter(area => area.area_id !== area_id));
      })
      .catch(error => console.error('Error deleting area:', error));
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Áreas</h2>
      <Link to="/admin/new-area" className="btn btn-primary mb-3">
        Agregar Área
      </Link>
      <ul className="list-group">
        {areas.map((area) => (
          <li
            key={area.area_id}
            className="list-group-item text-capitalize d-flex justify-content-between align-items-center"
          >
            <span className="me-3">
              <Link to={`/admin/area-assets/${area.area_id}`} className="text-decoration-none">
              {area.area_name}
              </Link>
            </span>
            <div>
              <Link
                to={`/admin/edit/${area.area_id}`}
                className="btn btn-secondary btn-sm me-2"
              >
                Editar
              </Link>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(area.area_id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AreaList;