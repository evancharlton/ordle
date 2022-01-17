import classes from "./Dialog.module.css";

type Props = {
  title: string | React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
};

const Dialog = ({ title, children, onClose }: Props) => {
  return (
    <div
      className={classes.blur}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div className={classes.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={classes.header}>
          {title}
          <button onClick={onClose}>X</button>
        </div>
        <div className={classes.contents}>{children}</div>
        <footer>
          <button onClick={onClose}>Lukk</button>
        </footer>
      </div>
    </div>
  );
};

export default Dialog;
