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
  const [line, setLineState] = useState<string>(() => {
    // Leer el valor inicial de localStorage
    const savedLine = localStorage.getItem('line');
    return savedLine || '';
  });

  const setLine = (newLine: string) => {
    setLineState(newLine);
    localStorage.setItem('line', newLine); // Guardar en localStorage
  };

  const hasPermission = true; // Aquí puedes implementar la lógica real de permisos

  return (
    <AppContext.Provider value={{ line, setLine, hasPermission }}>
      {children}
    </AppContext.Provider>
  );
};
