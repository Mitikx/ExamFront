import * as React from "react";
import { ThemeContext } from "./ThemeContext";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = React.useState<"light" | "dark">(() => {
    try {
      const saved = localStorage.getItem("theme");
      return saved === "dark" ? "dark" : "light";
    } catch (err) {
      console.warn("Impossible d'accéder au localStrorage pour ce theme", err);
      return "light";
    }
  });

  const [favorites, setFavorites] = React.useState<number[]>(() => {
    try {
      const raw = localStorage.getItem("favorites");
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.warn("Impossible d'accéder au localStrorage pour ce favorie", err);
      return [];
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch (err) {
      console.warn("Impossible d'accéder au localStrorage pour ce theme", err);
    }
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  React.useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (err) {
      console.warn("Impossible d'accéder au localStrorage pour ce favorie", err);
    }
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

