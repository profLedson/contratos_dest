import React from "react";
import type { FetcherButtonProps } from "./index";

const FetcherButton: React.FC<FetcherButtonProps> = ({ onClick, label, className = "" }) => {
  return (
    <button onClick={onClick} className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${className}`}>
      {label}
    </button>
  );
};

export default FetcherButton;
