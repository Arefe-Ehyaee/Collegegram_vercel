import { useState, ReactNode, useEffect, useRef } from "react";

interface ToggleMenuProps {
  children: ReactNode;
  imgSrc: string;
  label?:string
  className?: string;
}

export default function ToggleMenu({
  children,
  label,
  imgSrc,
  className = "",
}: ToggleMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({
    x: "",
    y: "",
  });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

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

    const buttonRect = button.getBoundingClientRect();
    const spaceTop = buttonRect.top;
    const spaceBottom = window.innerHeight - buttonRect.bottom;
    const spaceLeft = buttonRect.left;
    const spaceRight = window.innerWidth - buttonRect.right;

    let newPosition = {
      x: "left-4",
      y: "top-10",
    };

    // Adjust position based on available space
    if (spaceTop > spaceBottom) {
      newPosition.y = "bottom-10";
    }
    if (spaceLeft > spaceRight) {
      newPosition.x = "right-4";
    }

    setPosition(newPosition);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  let borderRounding = "";
  const menuPosition = `${position.x} ${position.y}`;
  if (menuPosition.includes("top") && menuPosition.includes("left")) {
    borderRounding = "rounded-bl-3xl rounded-br-3xl rounded-tr-3xl";
  }
  if (menuPosition.includes("top") && menuPosition.includes("right")) {
    borderRounding = "rounded-bl-3xl rounded-br-3xl rounded-tl-3xl";
  }
  if (menuPosition.includes("bottom") && menuPosition.includes("left")) {
    borderRounding = "rounded-tl-3xl rounded-br-3xl rounded-tr-3xl";
  }
  if (menuPosition.includes("bottom") && menuPosition.includes("right")) {
    borderRounding = "rounded-bl-3xl rounded-tl-3xl rounded-tr-3xl";
  }
  return (
    <div className="relative">
      <button onClick={handleToggle} ref={buttonRef} className="relative flex flex-row gap-x-2">
        <img src={imgSrc} alt="Toggle Menu" className="max-h-[54px] max-w-[24px]" /> <p>{label}</p>
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute ${menuPosition} ${borderRounding} ${className} mt-2 min-w-72 max-w-96 w-max border border-grey-700 bg-white z-10 px-8 py-6`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
