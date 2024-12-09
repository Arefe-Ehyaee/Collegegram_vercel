interface ModalPostProps {
  showModal: boolean;
  onClose?: () => void;
  className?: string;
  mainComponent?: JSX.Element;
  children?:React.ReactNode
}

const ModalTemplatePost = ({
  showModal,
  onClose,
  className,
  mainComponent,
  children
}: ModalPostProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black-100/40 ${className} ${showModal ? "visible bg-black-100/40" : "invisible"}`}
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center justify-center rounded-3xl border-grey-400 bg-grey-100 px-[35px] py-16"
        onClick={(e) => e.stopPropagation()}
      >
        {mainComponent}{children}
      </div>
    </div>
  );
};

export default ModalTemplatePost;
