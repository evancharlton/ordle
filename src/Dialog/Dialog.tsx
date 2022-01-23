import classes from "./Dialog.module.css";
import { MdOutlineClose } from "react-icons/md";

type Props = {
  title: string | React.ReactNode;
  children: React.ReactNode;
  onClose?: () => void;
};

const Dialog = ({ title, children, onClose }: Props) => {
  return (
    <div
      className={classes.blur}
      onClick={(e) => {
        e.stopPropagation();
        if (onClose) {
          onClose();
        }
      }}
    >
      <div className={classes.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={classes.header}>
          {title}
          {onClose && (
            <button onClick={onClose}>
              <MdOutlineClose />
            </button>
          )}
        </div>
        <div className={classes.contents}>{children}</div>
        {onClose && (
          <footer>
            <button onClick={onClose}>Lukk</button>
          </footer>
        )}
      </div>
    </div>
  );
};

export default Dialog;
