import { useEffect, useState } from "react";
import type { FetcherSelectProps } from "./types";

const FetcherSelect: React.FC<FetcherSelectProps> = ({
  endpoint,
  placeholder,
  value = "",
  onChange,
  labelName,
  ControlClassName,
  LabelClassName,
  selectClassName = "",
  optionClassName = "",
}) => {
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!endpoint) return;

    setLoading(true);
    setError(null);

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {

        if (Array.isArray(data)) {
          const formattedOptions = data.map((item: any) => ({
            label: item.name?.common || "Unknown",
            value: item.cca2 || "",
          }));

          setOptions(formattedOptions);
        } else {
          setError("Invalid data format");
        }
      })
      .catch((err) => {
        setError("Failed to load data");
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className={`flex flex-col text-start gap-2 ${ControlClassName}`}>
      <div className={LabelClassName}>{labelName}</div>
      <select      
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={`bg-white/70 border-1 border-black/20 p-3 rounded-md focus:ring-2 focus:ring-blue-500 ${selectClassName}`}
    >
      {/* Loading State */}
      {loading ? (
        <option value="" disabled>Carregando</option>
      ) : error ? (
        <option value="" disabled>Erro ao carregar dados</option>
      ) : (
        <>
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className={optionClassName}>
              {option.label}
            </option>
          ))}
        </>
      )}
    </select>
    </div>
  );
};

export default FetcherSelect;
