import React from 'react';

const Button = ({ text = "Text Here", onClick, bgColor, textColor }) => {
  const baseClasses = `px-6 py-3 rounded-xl font-semibold transition duration-200 shadow-lg`;
  const bgClasses = bgColor ? `${bgColor}` : 'bg-gray-400/60';
  const frostedClasses = ` backdrop-blur-md`;
  const hoverClasses = `hover:scale-105 hover:bg-opacity-50`;
  const textClasses = textColor?`${textColor}`:'text-white'

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${bgClasses} ${frostedClasses} ${hoverClasses} ${textClasses}`}
    >
      {text}
    </button>
  );
};

export default Button;
