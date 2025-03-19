import FormCadDados from "~/components/forms/cad-dados/form-cadastro-dados";
import LabelStatusForm from "~/components/forms/label-status-form";
import LabelTopForm from "~/components/forms/label-top-form";

function CadastroDados() {
  const currentYear = new Date() 

  return (
    <div className="flex flex-col gap-2 h-dvh ">
        <LabelTopForm title="Cadastro de Dados" currentYear={currentYear.getFullYear().toLocaleString()} />
        <FormCadDados />
        <span className="fixed bottom-0 w-[87%] p-0">
            <LabelStatusForm status="atualizado 5min atrás" currentYear={currentYear.toLocaleString()} />
        </span>
    </div>
) 
}

export default CadastroDados;