import React from "react";
import { useFetcher } from "react-router";
import type { FetcherFormProps } from "./types";

const FetcherForm: React.FC<FetcherFormProps> = ({ endpoint, method = "post", children, className = "" }) => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method={method} action={endpoint} className={`flex gap-2 ${className}`}>
      {children}
    </fetcher.Form>
  );
};

export default FetcherForm;
