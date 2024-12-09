import React from "react";

interface bannerProps {
  text: string;
  iconsrc?: string;
  className?: string;
}
const Banner: React.FC<bannerProps> = ({ text, iconsrc, className }) => {
  return (
    <div
      className={`text-black-200 flex h-[52px] w-[281px] items-center justify-center gap-2 rounded-2xl px-4 py-2 font-isf text-base font-normal subpixel-antialiased ${className}`}
      dir="rtl"
    >
      {text}
      {iconsrc && (
        <img src={iconsrc} alt="icon" className="h-[16px] w-[16px]" />
      )}
    </div>
  );
};

export default Banner;
