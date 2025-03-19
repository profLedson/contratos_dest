import FormFinalizarCadastro from "~/components/forms/cad-contrato-gms/form-finalizar-cadastro";
import FormNovoCadastro from "~/components/forms/cad-contrato-gms/form-novo-cadastro";
import LabelStatusForm from "~/components/forms/label-status-form";
import LabelTopForm from "~/components/forms/label-top-form";


function FinalizarCadastro() {
    const currentYear = new Date()   

    return (
        <div className="flex flex-col gap-2 h-dvh ">
            <LabelTopForm title="Finalizar Cadastro" currentYear={currentYear.getFullYear().toLocaleString()} />
            <FormFinalizarCadastro />
            <span className="fixed bottom-0 w-[87%] p-0">
                <LabelStatusForm status="atualizado 5min atrás" currentYear={currentYear.toLocaleString()} />
            </span>
        </div>
    ) 
} 
export default FinalizarCadastro;