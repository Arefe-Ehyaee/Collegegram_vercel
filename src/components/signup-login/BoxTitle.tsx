import React from 'react';

interface BoxTitleProps {
  text: string;
}

const BoxTitle: React.FC<BoxTitleProps> = ({ text }) => {
  return (
    <div className={"text-xl text-black-100 text-center"}>
        {text}
    </div>
  );
};

export default BoxTitle;
