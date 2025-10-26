import { createContext } from "react";

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

