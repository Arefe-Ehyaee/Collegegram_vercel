//you probably need to use [modal,setModal] to open and close the modal in whatever file you use it on

import { Children } from "react";

interface ModalProps {
  showModal: boolean;
  onClose?: () => void;
  className?: string;
  mainComponent?: JSX.Element;
  children?:React.ReactNode
}

const ModalTemplate = ({
  showModal,
  onClose,
  className,
  mainComponent,
  children
}: ModalProps) => {
  return (
    <div
      className={`fixed inset-0 flex z-40 flex-col items-center justify-center ${className} bg-black-100/40 ${showModal ? "visible bg-black-100/40" : "invisible"}`}
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center z-50 justify-center rounded-3xl border-grey-400 bg-grey-100 px-[90px] py-16"
        onClick={(e) => e.stopPropagation()}
      >
        {mainComponent}{children}
      </div>
    </div>
  );
};

export default ModalTemplate;
