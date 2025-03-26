// AppContext.tsx
import React, { createContext, useState, useEffect } from 'react';

interface AppContextProps {
  line: string;
  setLine: (line: string) => void;
  hasPermission: boolean;
}

export const AppContext = createContext<AppContextProps>({
  line: '',
  setLine: () => {},
  hasPermission: false,
});

export const AppProvider: React.FC = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [line, setLineState] = useState<string>(() => {
    // Leer el valor inicial de localStorage
    const savedLine = localStorage.getItem('selectedModelAssetId');
    if (savedLine) {
      fetch(`${apiUrl}/config/${savedLine}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched line data:', data);
        setLineState(`${data.area_asset_name} ${data.area_asset_number} ${data.model_asset_name}`);
      })
      .catch(error => console.error('Error fetching line name:', error));
    }
    return savedLine || '';
  });

  const setLine = (newLine: string) => {
    setLineState(newLine);
    localStorage.setItem('line', newLine);
  };

  const hasPermission = true;

  return (
    <AppContext.Provider value={{ line, setLine, hasPermission }}>
      {children}
    </AppContext.Provider>
  );
};
