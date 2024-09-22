import { useCallback, useRef } from "react";
import classes from "./Dialog.module.css";
import { MdOutlineClose } from "react-icons/md";

type Props = {
  title: string | React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
};

const Dialog = ({ title, children, onClose }: Props) => {
  const dialogRef = useRef<HTMLDialogElement | null>();

  const closeDialog = useCallback(() => {
    dialogRef.current?.close();
    onClose();
  }, [onClose]);

  return (
    <dialog
      ref={(ref) => {
        ref?.showModal();
        dialogRef.current = ref;
      }}
      className={classes.dialog}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={classes.header}>
        {title}
        <button onClick={closeDialog}>
          <MdOutlineClose />
        </button>
      </div>
      <div className={classes.contents}>{children}</div>
      <footer>
        <button onClick={closeDialog}>Lukk</button>
      </footer>
    </dialog>
  );
};

export default Dialog;
