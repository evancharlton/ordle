import { createContext, useContext } from "react";

type AccordionContextType = {
  segments: Record<string, boolean>;
  setActive: (segment: string) => void;
};

export const AccordionContext = createContext<AccordionContextType>({
  segments: {},
  setActive: () => {
    throw new Error("Not implemented");
  },
});

export const useAccordion = () => {
  return useContext(AccordionContext);
};
