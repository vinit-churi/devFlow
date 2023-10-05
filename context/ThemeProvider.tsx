"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface IThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}
const ThemeContext = createContext<IThemeContextType | undefined>(undefined);
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState("");
  useEffect(() => {
    const handleThemeChange = () => {
      if (mode === "dark") {
        setMode("light");
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      } else {
        setMode("dark");
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      }
    };
    handleThemeChange();
  }, [mode]);
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeProvider;
