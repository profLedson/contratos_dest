import FormCadFornecedor from "~/components/forms/cad-fornecedor/form-cadastro-fornecedor";
import LabelStatusForm from "~/components/forms/label-status-form";
import LabelTopForm from "~/components/forms/label-top-form";

function CadFornecedor() {
  const currentYear = new Date() 

  return (
    <div className="flex flex-col gap-2 h-dvh ">
        <LabelTopForm title="Cadastro de Fornecedor" currentYear={currentYear.getFullYear().toLocaleString()} />
        <FormCadFornecedor />
        <span className="fixed bottom-0 w-[87%] p-0">
            <LabelStatusForm status="atualizado 5min atrás" currentYear={currentYear.toLocaleString()} />
        </span>
    </div>
) 
}

export default CadFornecedor;