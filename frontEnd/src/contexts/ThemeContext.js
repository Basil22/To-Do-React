import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  createTheme,
} from "@mui/material";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getDesignTokens } from "./theme";

// Create a context = Set an initial value (optional)
const ThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("userTheme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("userTheme", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
