"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useCurtain } from "./curtain-provider";
import { forwardRef } from "react";
import React from "react";

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

export const TransitionLink = forwardRef(
  (
    props: Omit<React.ComponentProps<typeof NextLink>, "href"> & {
      to: string;
      transitionTitle?: string;
    },
    ref: React.Ref<HTMLAnchorElement>,
  ) => {
    const { run } = useCurtain();
    const router = useRouter();
    const { transitionTitle, to, ...restProps } = props;

    return (
      <NextLink
        {...restProps}
        href={to}
        ref={ref}
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          if (props.onClick) props.onClick(e);

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
                if (props.replace) {
                  router.replace(to);
                } else {
                  router.push(to);
                }
              },
              transitionTitle || formatTitleFromPath(to),
            );
          }
        }}
      />
    );
  },
);
