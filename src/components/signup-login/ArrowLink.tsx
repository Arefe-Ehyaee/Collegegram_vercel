import arrow from "../../assets/icons/arrow.svg"
import React from 'react';

interface ArrowLinkProps {
  text: string;
}

const ArrowLink: React.FC<ArrowLinkProps> = ({ text }) => {
  return (
    <div className={"text-sm text-red-200 flex justify-end items-center gap-x-2 mb-4"}>
        {text}
        <img src={arrow} alt="arrow" className="h-2 w-2" />
    </div>
  );
};

export default ArrowLink;