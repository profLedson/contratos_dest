'use client'

import FormNovoCadastro from "~/components/forms/cad-contrato-gms/form-novo-cadastro";
import LabelStatusForm from "~/components/forms/label-status-form";
import LabelTopForm from "~/components/forms/label-top-form";


const NovoCadastro = () => {
    const currentYear = new Date()
    return (
        <div className="flex flex-col gap-2 h-dvh bg-gray-200 ">
            <LabelTopForm title="Novo Cadastro" currentYear={currentYear.getFullYear().toLocaleString()} />
            <FormNovoCadastro />
            <span className="fixed bottom-0 w-[87%] p-0">
                <LabelStatusForm status="atualizado 5min atrás" currentYear={currentYear.toLocaleString()} />
            </span>
        </div>
    )
}

export default NovoCadastro;

