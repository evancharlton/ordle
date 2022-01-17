import { createContext, useContext } from "react";

type AccordionContextType = {
  segment: string;
  setActive: (segment: string) => void;
};

export const AccordionContext = createContext<AccordionContextType>({
  segment: "",
  setActive: () => {
    throw new Error("Not implemented");
  },
});

export const useAccordion = () => {
  return useContext(AccordionContext);
};
