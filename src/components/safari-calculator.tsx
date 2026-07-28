import { useState } from "react";
import { Users, Compass, MapPin, Calculator, ArrowRight, CheckCircle2 } from "lucide-react";
import { waLink } from "@/lib/site";

type SafariOption = {
  id: string;
  name: string;
  duration: string;
  baseJeepUsd: number;
  perAdultUsd: number;
  perChildUsd: number;
  bestFor: string;
};

const safariTypes: SafariOption[] = [
  {
    id: "morning-private-safari",
    name: "Morning Private Safari",
    duration: "3.5 Hours (05:45 - 09:30)",
    baseJeepUsd: 45,
    perAdultUsd: 28,
    perChildUsd: 14,
    bestFor: "Best for active wildlife & cool sunrise weather",
  },
  {
    id: "afternoon-private-safari",
    name: "Afternoon Private Safari",
    duration: "3.5 Hours (14:30 - 18:00)",
    baseJeepUsd: 45,
    perAdultUsd: 28,
    perChildUsd: 14,
    bestFor: "Best for elephant herds gathering at reservoir sunset",
  },
  {
    id: "full-day-wildlife-safari",
    name: "Full-Day Wildlife Safari",
    duration: "10 Hours (05:45 - 16:30)",
    baseJeepUsd: 95,
    perAdultUsd: 45,
    perChildUsd: 22,
    bestFor: "Maximum coverage & deep park exploration with lunch",
  },
  {
    id: "safari-ella-transfer",
    name: "Safari + Ella Transfer Package",
    duration: "Safari + Door-to-Door Taxi",
    baseJeepUsd: 90,
    perAdultUsd: 28,
    perChildUsd: 14,
    bestFor: "Ideal for travelers heading between Coast & Hill Country",
  },
];

const pickupLocations: { name: string; addFeeUsd: number }[] = [
  { name: "Udawalawe / Park Gate (Free Hotel Pick-up)", addFeeUsd: 0 },
  { name: "Ella / Bandarawela Private Taxi", addFeeUsd: 45 },
  { name: "Mirissa / Weligama / Matara Coast", addFeeUsd: 55 },
  { name: "Hiriketiya / Dikwella Coast", addFeeUsd: 50 },
  { name: "Galle / Unawatuna Coast", addFeeUsd: 65 },
  { name: "Colombo / Airport Transfer", addFeeUsd: 85 },
];

export function SafariCalculator() {
  const [selectedSafariId, setSelectedSafariId] = useState<string>("morning-private-safari");
  const [adults, setAdults] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [pickupIndex, setPickupIndex] = useState<number>(0);

  const activeSafari = safariTypes.find((s) => s.id === selectedSafariId) || safariTypes[0];
  const pickup = pickupLocations[pickupIndex];

  // Price Calculation
  const jeepCost = activeSafari.baseJeepUsd;
  const permitsCost = adults * activeSafari.perAdultUsd + childrenCount * activeSafari.perChildUsd;
  const transferCost = pickup.addFeeUsd;
  const totalUsd = jeepCost + permitsCost + transferCost;
  const totalLkrEst = Math.round(totalUsd * 305); // Approx exchange rate

  const formattedWaMsg = `Hi Udawalawe Wild! I calculated a quote on your website:\n- Package: ${activeSafari.name}\n- Guests: ${adults} Adults, ${childrenCount} Children\n- Pickup Location: ${pickup.name}\n- Estimated Quote: ~$${totalUsd} USD. Could you verify availability for my dates?`;

  return (
    <div className="overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-xl backdrop-blur sm:p-8">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
        <Calculator className="h-4 w-4" />
        <span>Instant Quote Estimator</span>
      </div>
      <h2 className="mt-2 font-serif text-2xl sm:text-3xl text-foreground">
        Transparent Pricing Calculator
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        No hidden gate surprises. Adjust your safari parameters to calculate guaranteed transparent rates.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* Controls */}
        <div className="space-y-6 lg:col-span-7">
          {/* Safari Type */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              1. Select Safari Experience
            </label>
            <div className="grid gap-2 sm:grid-cols-2">
              {safariTypes.map((s) => {
                const isSelected = s.id === selectedSafariId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSafariId(s.id)}
                    className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition ${
                      isSelected
                        ? "border-primary bg-primary/10 ring-1 ring-primary"
                        : "border-border/80 bg-background/50 hover:border-primary/40"
                    }`}
                  >
                    <div>
                      <div className="font-serif font-medium text-foreground text-sm">{s.name}</div>
                      <div className="mt-1 text-[11px] text-muted-foreground">{s.duration}</div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="text-xs font-semibold text-primary">From ${s.baseJeepUsd + s.perAdultUsd}/jeep</span>
                      {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Guest Count */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Adults (Age 12+)
              </label>
              <div className="flex items-center rounded-xl border border-input bg-background p-1">
                <button
                  type="button"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  className="h-9 w-9 rounded-lg border border-border bg-card text-foreground font-semibold text-sm transition hover:bg-accent"
                >
                  -
                </button>
                <div className="flex-1 text-center font-serif text-lg font-medium text-foreground">
                  {adults}
                </div>
                <button
                  type="button"
                  onClick={() => setAdults(Math.min(10, adults + 1))}
                  className="h-9 w-9 rounded-lg border border-border bg-card text-foreground font-semibold text-sm transition hover:bg-accent"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Children (Age 6-11)
              </label>
              <div className="flex items-center rounded-xl border border-input bg-background p-1">
                <button
                  type="button"
                  onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                  className="h-9 w-9 rounded-lg border border-border bg-card text-foreground font-semibold text-sm transition hover:bg-accent"
                >
                  -
                </button>
                <div className="flex-1 text-center font-serif text-lg font-medium text-foreground">
                  {childrenCount}
                </div>
                <button
                  type="button"
                  onClick={() => setChildrenCount(Math.min(6, childrenCount + 1))}
                  className="h-9 w-9 rounded-lg border border-border bg-card text-foreground font-semibold text-sm transition hover:bg-accent"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Pickup location */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-accent" /> Pickup Location / Door-to-Door Transfer
              </span>
            </label>
            <select
              value={pickupIndex}
              onChange={(e) => setPickupIndex(Number(e.target.value))}
              className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {pickupLocations.map((loc, idx) => (
                <option key={loc.name} value={idx}>
                  {loc.name} {loc.addFeeUsd > 0 ? `(+$${loc.addFeeUsd} Transfer)` : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Calculation Summary Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-primary/30 bg-secondary/40 p-6 lg:col-span-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Estimated Total Quote
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-serif text-4xl font-semibold text-primary sm:text-5xl">
                ${totalUsd}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                USD (~{totalLkrEst.toLocaleString()} LKR)
              </span>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              Includes private safari jeep, driver, national park admission tickets & government taxes.
            </p>

            <div className="mt-6 space-y-2.5 border-t border-border/80 pt-4 text-xs text-foreground/80">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Private Safari Jeep + Guide:</span>
                <span className="font-medium">${jeepCost} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Park Entry Permits ({adults + childrenCount} guests):</span>
                <span className="font-medium">${permitsCost} USD</span>
              </div>
              {transferCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Private Intercity Taxi Transfer:</span>
                  <span className="font-medium">${transferCost} USD</span>
                </div>
              )}
            </div>

            <div className="mt-4 rounded-lg bg-background/80 p-3 text-[11px] text-muted-foreground">
              💡 <strong>Guarantee:</strong> Pay fixed verified quote upon arrival or driver pickup. No credit card required to request.
            </div>
          </div>

          <div className="mt-6 space-y-2.5">
            <a
              href={waLink(formattedWaMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-md transition hover:brightness-110"
            >
              <span>Instant Reserve on WhatsApp</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#booking-form"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-xs font-medium text-foreground transition hover:bg-accent/40"
            >
              <Compass className="h-3.5 w-3.5 text-primary" />
              <span>Or Lock in via Enquiry Form</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
