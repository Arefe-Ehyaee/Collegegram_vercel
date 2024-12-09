import React from "react";
import erroricon from "../assets/icons/workflow-status-problem.svg"

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  iconsrc?: string;
  className?: string;
  error?: string;
  register?: any; 
}

const InputField: React.FC<InputProps> = ({ name, placeholder, type, register, className, iconsrc, error }) => {
  return (
    <div className="relative mb-6">
      <input
        type={type}
        id={name}
        name={name}
        className={`flex flex-col items-center w-80 h-8 border border-grey-400 px-4 py-2 rounded-2xl text-xs font-normal placeholder-grey-400 font-isf pr-[30px] ${className} placeholder-start ${error ? "border-red-500" : ""}`}
        dir="rtl"
        placeholder={placeholder}
        {...register(name)}  
      />
      {iconsrc && <img src={iconsrc} alt="icon" className="h-4 w-4 absolute top-1/2 right-3 transform -translate-y-1/2" />}
      {error && 
        <div className="absolute top-full right-0 mt-1 text-right w-full">
          <span className="text-red-400 text-xs flex items-center">
            {error}
            {erroricon && <img src={erroricon} alt="icon" className="inline-block ml-1 h-4 w-4"/>}
          </span>
        </div>
      }
    </div>
  );
};

export default InputField;
