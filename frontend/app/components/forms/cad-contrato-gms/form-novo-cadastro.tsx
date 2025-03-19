import { useFetcher } from "react-router"
import type { Route } from "types/app/+types/root";
import { FetcherInput } from "~/types";
import FetcherSelect from "~/types/FetcherSelect";
import { useState } from "react";


function FormNovoCadastro() {
   let fetcher = useFetcher();
   const [fonteMaterial, setFonteMaterial] = useState("");
   return (
      <div className=" flex flex-col border-b-3 h-11/12 border-black/10">

         <fetcher.Form method="post">
            <div className="flex flex-col w-full p-4">
               <div className="flex justify-center font-semibold w-full p-4 border-b-3 border-b-gray-300 ">
                  CONTROLE DE PROCESSO
               </div>
               <div className="flex gap-4 p-4">
                  <FetcherInput
                     inputType="text"
                     inputLabel="Protocolo"
                     placeholder="00000/0000"
                     inputClassName=""
                  />
                  <FetcherInput
                     inputType="text"
                     inputLabel="Responsável"
                     placeholder="Nome do responsável"
                     inputClassName=""
                  />
                  <FetcherSelect
                     labelName="Fonte Material"
                     // endpoint="https://restcountries.com/v3.1/all"
                     endpoint="https://localhost:443/get-raw"
                     placeholder="Escolha uma opção..."
                     onChange={(value) => setFonteMaterial(value)}
                     ControlClassName=""
                     optionClassName="p-2 bg-white/70"
                  />
               </div>
            </div>
         </fetcher.Form>
      </div>
   )
}
export default FormNovoCadastro;