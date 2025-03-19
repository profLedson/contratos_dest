import LabelStatusForm from "~/components/forms/label-status-form";
import LabelTopForm from "~/components/forms/label-top-form";
import FormPesquisa from "~/components/forms/pesquisa/form-pesquisa";

function PesquisaContrato() {

  const currentYear = new Date() 

  return (
    <div className="flex flex-col gap-2 h-dvh ">
        <LabelTopForm title="Pesquisar Contrato" currentYear={currentYear.getFullYear().toLocaleString()} />
        <FormPesquisa />
        <span className="fixed bottom-0 w-[87%] p-0">
            <LabelStatusForm status="atualizado 5min atrás" currentYear={currentYear.toLocaleString()} />
        </span>
    </div>
) 
}

export default PesquisaContrato;