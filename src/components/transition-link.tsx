import { Link as RouterLink, useNavigate } from "@tanstack/react-router";
import { useCurtain } from "./curtain-provider";
import { forwardRef } from "react";

const ROUTE_TITLES: Record<string, string> = {
  "/": "Udawalawe Wild",
  book: "Request Availability",
  about: "Our Story",
  safaris: "Safari Options",
  guide: "Visitor Guide",
  "ethical-safari": "Ethical Standard",
  routes: "Travel Routes",
  privacy: "Privacy Policy",
  terms: "Terms of Use",
  "cancellation-policy": "Cancellation Policy",
};

function formatTitleFromPath(path?: string) {
  if (!path || path === "/" || path === "") return "Udawalawe Wild";
  // split and grab the first segment
  const segment = path.split("/")[1]?.split("?")[0]?.split("#")[0];
  if (!segment) return "Udawalawe Wild";

  if (ROUTE_TITLES[segment]) {
    return ROUTE_TITLES[segment];
  }

  // fallback for unknown routes: capitalize and replace hyphens
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// @ts-expect-error Types for RouterLink props might be complex
export const TransitionLink = forwardRef(
  (props: React.ComponentProps<typeof RouterLink>, ref: React.Ref<HTMLAnchorElement>) => {
    const { run } = useCurtain();
    const navigate = useNavigate();

    return (
      <RouterLink
        {...props}
        ref={ref}
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          if (props.onClick) props.onClick(e);

          // Only intercept normal left clicks, allow cmd+click to open in new tab normally
          if (
            !e.defaultPrevented &&
            e.button === 0 &&
            !e.ctrlKey &&
            !e.metaKey &&
            !e.shiftKey &&
            !e.altKey &&
            (!props.target || props.target === "_self")
          ) {
            e.preventDefault();

            run(
              async () => {
                // Perform the actual navigation when the curtain covers the screen
                await navigate({
                  to: props.to,
                  search: props.search,
                  params: props.params,
                  hash: props.hash,
                  replace: props.replace,
                });
              },
              props.transitionTitle ||
                formatTitleFromPath(typeof props.to === "string" ? props.to : props.to?.pathname),
            );
          }
        }}
      />
    );
  },
);
