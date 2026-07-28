import { useState, useRef, useEffect } from "react";
import { Sun, Sunrise, Sunset, Moon, Sparkles, ChevronDown } from "lucide-react";
import { useTheme, type SafariTheme } from "./theme-provider";

const themes: { id: SafariTheme; label: string; icon: React.ElementType; description: string }[] = [
  { id: "day", label: "Savannah Day", icon: Sun, description: "Bright & crisp ivory savannah" },
  { id: "dawn", label: "Dawn Gold", icon: Sunrise, description: "Golden morning mist & warm light" },
  { id: "sunset", label: "Sunset Amber", icon: Sunset, description: "Warm terracotta twilight dusk" },
  { id: "night", label: "Starlight Night", icon: Moon, description: "Obsidian dark mode & star glow" },
  { id: "system", label: "Auto Time-of-Day", icon: Sparkles, description: "Matches Sri Lanka local hour" },
];

export function ThemeToggle() {
  const { theme, setTheme, activeAtmosphere } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentThemeObj = themes.find((t) => t.id === theme) || themes[0];
  const CurrentIcon = currentThemeObj.icon;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur transition hover:border-primary/50 hover:bg-accent/40 focus:outline-none focus:ring-2 focus:ring-primary/40"
        aria-label="Select theme atmosphere"
        aria-expanded={open}
      >
        <span className="flex items-center gap-1.5">
          <CurrentIcon className="h-3.5 w-3.5 text-primary" />
          <span className="hidden sm:inline-block capitalize font-medium">{currentThemeObj.label}</span>
          <span className="sm:hidden capitalize text-[10px] font-semibold">{activeAtmosphere}</span>
        </span>
        <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 origin-top-right rounded-xl border border-border/80 bg-card p-1.5 shadow-xl backdrop-blur-xl ring-1 ring-black/5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Safari Atmosphere
          </div>
          <div className="space-y-0.5 mt-1">
            {themes.map((t) => {
              const Icon = t.icon;
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTheme(t.id);
                    setOpen(false);
                  }}
                  className={`flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition ${
                    isSelected
                      ? "bg-primary text-primary-foreground font-medium shadow-xs"
                      : "text-foreground hover:bg-accent/60"
                  }`}
                >
                  <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${isSelected ? "text-primary-foreground" : "text-primary"}`} />
                  <div>
                    <div className="font-medium leading-none">{t.label}</div>
                    <div className={`mt-1 text-[10px] ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      {t.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
