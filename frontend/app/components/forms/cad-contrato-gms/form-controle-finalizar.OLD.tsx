import { useState } from "react";
import { FetcherInput } from "~/types";
import FetcherSelect from "~/types/FetcherSelect";

function FormControleBasico() {
    const [selectedCountry, setSelectedCountry] = useState("");
    return (
        <div className="flex flex-col w-full p-4">
            <div className="flex justify-center font-semibold w-full p-4">
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
                endpoint="https://restcountries.com/v3.1/all"
                placeholder="Escolha uma opção..."
                onChange={(value) => setSelectedCountry(value)}
                ControlClassName=""
                optionClassName="p-2"
            />

            </div>

        </div>
    )
}

export default FormControleBasico;