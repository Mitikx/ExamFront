import React, { createContext, useEffect, useState } from "react";

type AppContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
};

export const ThemeContext = createContext<AppContextType>({
  theme: "light",
  toggleTheme: () => {},
  favorites: [],
  toggleFavorite: () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try {
      const saved = localStorage.getItem("theme");
      return saved === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem("favorites");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch {}
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, favorites, toggleFavorite }}>
      {children}
    </ThemeContext.Provider>
  );
};

