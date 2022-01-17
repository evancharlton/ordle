import { useState } from "react";
import { AccordionContext } from "./context";

type Props = {
  initial?: string;
  children: React.ReactNode;
};

const Accordion = ({ initial, children }: Props) => {
  const [segment, setSegment] = useState(initial ?? "");

  return (
    <AccordionContext.Provider value={{ segment, setActive: setSegment }}>
      {children}
    </AccordionContext.Provider>
  );
};

export default Accordion;
