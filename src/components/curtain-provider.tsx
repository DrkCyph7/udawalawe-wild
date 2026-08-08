import { createContext, useContext, ReactNode, useState } from "react";
import { usePageCurtainTransition, CurtainTransition } from "./page-curtain-transition";

interface CurtainContextType {
  run: (swapContent: () => void, title?: string) => void;
}

const CurtainContext = createContext<CurtainContextType | null>(null);

export function useCurtain() {
  const context = useContext(CurtainContext);
  if (!context) throw new Error("useCurtain must be used within CurtainProvider");
  return context;
}

export function CurtainProvider({ children }: { children: ReactNode }) {
  const { phase, run, handleCoverComplete, handleRevealComplete } = usePageCurtainTransition();
  const [curtainTitle, setCurtainTitle] = useState("Udawalawe Wild");

  const runWithTitle = (swapContent: () => void, title?: string) => {
    setCurtainTitle(title || "Udawalawe Wild");
    run(swapContent);
  };

  return (
    <CurtainContext.Provider value={{ run: runWithTitle }}>
      {children}
      <CurtainTransition
        phase={phase}
        title={curtainTitle}
        onCoverComplete={handleCoverComplete}
        onRevealComplete={handleRevealComplete}
      />
    </CurtainContext.Provider>
  );
}
