import { useState, ReactNode, useEffect, useRef } from "react";
import { toast } from "react-toastify";

interface ToggleMenuProps {
  children: ReactNode;
  imgSrc: string;
  label?:string
  className?: string;
  isOpen?: boolean;
  onClick?: () => void;
}

export default function ToggleMenu({
  children,
  label,
  imgSrc,
  className = "",
  isOpen: isOpenProp,
  onClick
}: ToggleMenuProps) {
  const [isOpen, setIsOpen] = useState(isOpenProp);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(isOpenProp);
  }, [isOpenProp]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const button = buttonRef.current;
    const menu = menuRef.current;
    if (!button || !menu) return;




    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  
  let borderRounding = "rounded-bl-3xl rounded-br-3xl rounded-tl-3xl";



  return (
    <div className="relative" style={{ zIndex: 50 }}>
      <button ref={buttonRef} onClick={onClick} className="relative flex flex-row gap-x-2">
        <img src={imgSrc} alt="Toggle Menu" className="max-h-[22px] max-w-[22px]" /> <p>{label}</p>
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          style={{ zIndex: 0 }}
          className={`absolute ${borderRounding} ${className} left-0 mt-6 min-w-80 max-w-96 w-max border border-grey-700 bg-white z-10 px-8 py-6`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
