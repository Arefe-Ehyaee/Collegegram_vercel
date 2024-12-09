import React from "react";
import { UseFormRegister } from "react-hook-form";

interface PostToggleButtonProps {
  label: string;
  register: UseFormRegister<any>;
  name: string;
  defaultChecked: boolean
}

const PostToggleButton: React.FC<PostToggleButtonProps> = ({ label, register, name}) => {
  // console.log('def checked', defaultChecked)
  return (
    <label className="inline-flex cursor-pointer items-center space-x-4">
      <input
        type="checkbox"
        className="peer sr-only"
        {...register(name)}
      />
      <div className="dark:bg-grey-400-700 peer-checked:bg-blue-600 after:border-grey-400-300 dark:border-grey-400-600 peer relative h-[24px] w-[40px] rounded-full bg-white after:absolute after:right-[2px] after:top-[2px] after:h-[20px] after:w-[20px] after:rounded-full after:border after:bg-white after:transition-all after:content-[''] focus:ring-white peer-checked:bg-red-200 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-0 rtl:peer-checked:after:-translate-x-full dark:peer-focus:ring-grey-400"></div>
      <span className="dark:text-grey-400-300 ms-3 text-sm font-normal text-green-200">
        {label}
      </span>   
    </label>
  );
};

export default PostToggleButton;
