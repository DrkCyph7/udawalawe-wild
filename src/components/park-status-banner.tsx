import { Sun, Compass, ShieldCheck } from "lucide-react";

export function ParkStatusBanner() {
  return (
    <div className="border-y border-border/80 bg-secondary/60 py-2.5 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 text-xs text-foreground/80 sm:px-8">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-medium text-foreground">Udawalawe National Park:</span>
          <span className="text-muted-foreground">Gate Open • Best Spotting Window Active</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Sun className="h-3.5 w-3.5 text-amber-500" />
            <span>29°C Sunny Savannah</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5 text-primary" />
            <span>Elephant Herds Spotted Today</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            <span>100% Guaranteed Private Jeeps</span>
          </div>
        </div>
      </div>
    </div>
  );
}
