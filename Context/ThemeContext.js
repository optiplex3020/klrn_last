import React, { createContext, useState } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    isDarkMode,
    toggleDarkMode,
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
