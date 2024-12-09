import React, { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import erroricon from "../assets/icons/workflow-status-problem.svg";
import addEmojiIcon from "../assets/icons/addEmoji.svg"; // Renamed import to avoid confusion

interface InputProps {
  name: string;
  placeholder?: string;
  iconsrc?: string;
  className?: string;
  error?: string;
  register?: any;
  label?: string;
}

const TextAreaWithEmojiComponent: React.FC<InputProps> = ({
  name,
  placeholder,
  className,
  register,
  error,
  label,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const addEmoji = (emoji: any) => {
    setInputValue(inputValue + emoji.native);
  };

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={name}
          className="absolute right-0 top-[-30px] mr-2 text-sm"
        >
          {label}
        </label>
      )}
      
      <div className="absolute left-0 top-[-30px] ml-2">
      <img
          src={addEmojiIcon}
          alt="Add Emoji"
          className="h-6 w-6"
          onClick={() => setShowPicker(!showPicker)}
        />
        {showPicker && (
          <div className="absolute top-[30px] z-10">
            <Picker data={data} onEmojiSelect={addEmoji} theme="light" />
          </div>
        )}
      </div>

      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        className={`h-[88px] w-[320px] resize-none rounded-[32px] border border-green-200 ${className} p-4`}
        {...register(name)}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></textarea>

      {error && (
        <div className="absolute right-0 top-full mt-1 w-full text-right">
          <span className="flex items-center text-xs text-red-400">
            {error}
            {erroricon && (
              <img
                src={erroricon}
                alt="icon"
                className="h-4 ml-1 inline-block w-4"
              />
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default TextAreaWithEmojiComponent;
