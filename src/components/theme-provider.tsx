import React, { createContext, useContext, useEffect, useState } from "react";

export type SafariTheme = "day" | "dawn" | "sunset" | "night" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: SafariTheme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: SafariTheme;
  setTheme: (theme: SafariTheme) => void;
  activeAtmosphere: "day" | "dawn" | "sunset" | "night";
};

const initialState: ThemeProviderState = {
  theme: "day",
  setTheme: () => null,
  activeAtmosphere: "day",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "day",
  storageKey = "udawalawe-wild-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<SafariTheme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    try {
      return (localStorage.getItem(storageKey) as SafariTheme) || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  const [activeAtmosphere, setActiveAtmosphere] = useState<"day" | "dawn" | "sunset" | "night">("day");

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove("dark", "theme-dawn", "theme-sunset", "theme-night", "theme-day");

    let resolvedAtmosphere: "day" | "dawn" | "sunset" | "night" = "day";

    if (theme === "system") {
      const now = new Date();
      const utcHours = now.getUTCHours() + 5.5;
      const slHour = (utcHours >= 24 ? utcHours - 24 : utcHours);

      if (slHour >= 5 && slHour < 8) {
        resolvedAtmosphere = "dawn";
      } else if (slHour >= 8 && slHour < 16) {
        resolvedAtmosphere = "day";
      } else if (slHour >= 16 && slHour < 19) {
        resolvedAtmosphere = "sunset";
      } else {
        resolvedAtmosphere = "night";
      }
    } else {
      resolvedAtmosphere = theme;
    }

    setActiveAtmosphere(resolvedAtmosphere);

    if (resolvedAtmosphere === "night") {
      root.classList.add("dark", "theme-night");
    } else if (resolvedAtmosphere === "dawn") {
      root.classList.add("theme-dawn");
    } else if (resolvedAtmosphere === "sunset") {
      root.classList.add("theme-sunset");
    } else {
      root.classList.add("theme-day");
    }
  }, [theme]);

  const setTheme = (newTheme: SafariTheme) => {
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (e) {
      console.warn("Could not save theme to localStorage", e);
    }
    setThemeState(newTheme);
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, activeAtmosphere }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
