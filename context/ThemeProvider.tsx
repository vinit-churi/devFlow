"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface IThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}
const ThemeContext = createContext<IThemeContextType | undefined>(undefined);
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState("system");
  const handleThemeChange = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  };
  useEffect(() => {
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
