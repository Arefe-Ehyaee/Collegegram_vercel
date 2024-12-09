import React from 'react';

interface BoxProps {
  text: string;
}

const Label: React.FC<BoxProps> = ({ text }) => {
  return (
    <div className={"text-sm text-brown text-right leading-6 mb-8 mt-16 w-80 tracking-tight"}>
        {text}
    </div>
  );
};

export default Label;
