import { useAccordion } from "../context";
import classes from "./Segment.module.css";
import { MdExpandMore, MdChevronRight } from "react-icons/md";

export type Props = {
  id: string;
  title: string | React.ReactNode;
  children: React.ReactNode;
};

const Segment = ({ id, title, children }: Props) => {
  const { segments, setActive } = useAccordion();
  const active = !!segments[id];
  return (
    <div
      className={[
        classes.segment,
        active && classes.active,
        !active && classes.inactive,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header onClick={() => setActive(id)} role="button">
        {active && <MdExpandMore />}
        {!active && <MdChevronRight />}
        {title}
      </header>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default Segment;
