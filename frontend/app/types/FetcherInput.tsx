import React from "react";
import { useFetcher } from "react-router";
import type { FetcherInputProps } from "./types";

const FetcherInput: React.FC<FetcherInputProps> = ({
  endpoint,
  method = "get",
  inputType = "text",
  placeholder,
  inputLabel,
  value,
  onChange,
  inputClassName,
  showButton = false,
}) => {
  const fetcher = useFetcher();

  const handleSubmit = () => {
    const formData = new FormData();
    if (value) formData.append("data", value); // Ensure value is not undefined

    fetcher.submit(formData, { method, action: endpoint });
  }
  return (
    <div className={`flex flex-col text-start gap-2 ${inputClassName}`}>
      <div className="">
        {inputLabel}
      </div>
      <input
        type={inputType}
        name="data"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`bg-white/70 border-1 border-black/20  p-2 rounded-md  ${inputClassName}`}
      />
      {showButton && <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>}
    </div>
  );
};

export default FetcherInput;
