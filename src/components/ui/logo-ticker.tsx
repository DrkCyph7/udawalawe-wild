import React from "react";

import { cn } from "@/lib/utils";

interface LogoTickerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Duration of one full loop in seconds */
  duration?: number;
  /** Whether the ticker scrolls in reverse (right to left is default, reverse is left to right) */
  reverse?: boolean;
  /** Pause animation on hover */
  pauseOnHover?: boolean;
  /** Fade edges for a gradient mask effect */
  fadeEdges?: boolean;
}

export function LogoTicker({
  children,
  duration = 30,
  reverse = false,
  pauseOnHover = false,
  fadeEdges = false,
  className,
  ...props
}: LogoTickerProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden",
        fadeEdges &&
          "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex w-max min-w-full shrink-0 items-center",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `marquee ${duration}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
          willChange: "transform",
        }}
      >
        {/* We duplicate the children twice to ensure seamless looping (0% to -50%) */}
        <React.Fragment key="ticker-1">{children}</React.Fragment>
        <React.Fragment key="ticker-2">{children}</React.Fragment>
      </div>
    </div>
  );
}
