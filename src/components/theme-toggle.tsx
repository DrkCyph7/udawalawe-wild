import { Sun, Moon, Sparkles } from "lucide-react";
import { useTheme, type SafariTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "day") {
      setTheme("night");
    } else if (theme === "night") {
      setTheme("system");
    } else {
      setTheme("day");
    }
  };

  const getIcon = () => {
    if (theme === "day") return <Sun className="h-4 w-4 text-amber-500 transition-transform duration-300 hover:rotate-45" />;
    if (theme === "night") return <Moon className="h-4 w-4 text-indigo-400 transition-transform duration-300 hover:-rotate-12" />;
    return <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />;
  };

  const getLabel = () => {
    if (theme === "day") return "Day mode";
    if (theme === "night") return "Night mode";
    return "Auto theme";
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-secondary/50 text-foreground shadow-xs backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-secondary hover:border-primary/40 focus:outline-none"
      title={`Theme: ${getLabel()} (Click to toggle)`}
      aria-label={`Toggle theme: current is ${getLabel()}`}
    >
      {getIcon()}
    </button>
  );
}
