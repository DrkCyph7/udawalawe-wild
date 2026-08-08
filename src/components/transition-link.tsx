import { Link as RouterLink, useNavigate } from "@tanstack/react-router";
import { useCurtain } from "./curtain-provider";
import { forwardRef } from "react";

function formatTitleFromPath(path?: string) {
  if (!path || path === "/" || path === "") return "Udawalawe Wild";
  // split and grab the first segment
  const segment = path.split("/")[1]?.split("?")[0]?.split("#")[0];
  if (!segment) return "Udawalawe Wild";
  // capitalize and replace hyphens with spaces
  return segment.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

// @ts-ignore
export const TransitionLink = forwardRef((props: any, ref: any) => {
  const { run } = useCurtain();
  const navigate = useNavigate();

  return (
    <RouterLink
      {...props}
      ref={ref}
      onClick={(e: any) => {
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
          
          run(() => {
            // Perform the actual navigation when the curtain covers the screen
            navigate(props);
          }, props.transitionTitle || formatTitleFromPath(typeof props.to === "string" ? props.to : props.to?.pathname));
        }
      }}
    />
  );
});
