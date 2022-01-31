import { useCallback, useState } from "react";
import { AccordionContext } from "./context";

type SingleProps = {
  initial?: string;
  mode: "single";
};

type MultipleProps = {
  initial?: string[];
  mode: "multiple";
};

type CommonProps = {
  children: React.ReactNode;
};

type Props = CommonProps & (SingleProps | MultipleProps);

const Accordion = ({ initial, children, mode }: Props) => {
  const [segments, setSegments] = useState<Record<string, boolean>>(() => {
    switch (mode) {
      case "single": {
        if (initial) {
          if (typeof initial !== "string") {
            throw new Error("Wrong type provided for initial");
          }
          return { [initial]: true };
        }
        break;
      }

      case "multiple": {
        if (initial) {
          if (!Array.isArray(initial)) {
            throw new Error("Wrong type provided for initial");
          }
          return initial.reduce(
            (acc, i) => ({ ...acc, [i]: true }),
            {} as Record<string, boolean>
          );
        }
      }
    }
    return {};
  });

  const setActive = useCallback(
    (segmentId) => {
      if (mode === "multiple") {
        setSegments((s) => ({ ...s, [segmentId]: !s[segmentId] }));
      } else {
        setSegments({ [segmentId]: true });
      }
    },
    [mode]
  );

  return (
    <AccordionContext.Provider value={{ segments, setActive }}>
      {children}
    </AccordionContext.Provider>
  );
};

export default Accordion;
