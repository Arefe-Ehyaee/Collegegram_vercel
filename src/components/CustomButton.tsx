
interface ButtonProps {
  text?: string;
  iconsrc?: string | null;
  className?: string;
  children?: React.ReactNode;
  handleOnClick?: () => void;
  size?: "small" | "medium" | "large"; 
}

const CustomButton = ({
  text,
  iconsrc,
  className = "",
  handleOnClick,
  children,
  size = "medium", 
}:ButtonProps) => {
  const baseStyle =
    " flex text-white items-center gap-2 rounded-2xl text-sm font-isf subpixel-antialiased";
  
  const sizeStyle = {
    small: "h-[32px] px-4 py-2",
    medium: "h-9 px-4 py-2",
    large: "h-[52px] px-12 py-4 rounded-3xl",
  };


  
  const buttonClassName = `${baseStyle} ${sizeStyle[size]} ${className}`;

  return (
    <button onClick={handleOnClick} className={buttonClassName} dir="rtl">
      {children}
      {iconsrc && <img src={iconsrc} alt="logo" className="h-3.5 w-3.5" />}
      {text && <span>{text}</span>}
    </button>
  );
};

export default CustomButton;
