/*
  Warnings:

  - You are about to drop the `Contratos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Contratos";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "foto" TEXT,
    "usuario" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" SERIAL NOT NULL,
    "nome_completo" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "num_telefone" TEXT,
    "whatsapp" TEXT,

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FSP" (
    "id" SERIAL NOT NULL,
    "nome_fsp" TEXT NOT NULL,
    "subunidade" TEXT[],

    CONSTRAINT "FSP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" SERIAL NOT NULL,
    "nome_objeto" TEXT,
    "quantidade" INTEGER NOT NULL,
    "desc_objeto" TEXT,
    "valor_unit" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "valor_contrato" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servico" (
    "id" SERIAL NOT NULL,
    "nome_objeto" TEXT,
    "desc_objeto" TEXT,
    "qtd_postos" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "valor_unit" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "valor_mensal" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "valor_contrato" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObjetoContrato" (
    "id" SERIAL NOT NULL,
    "num_licitacao" TEXT NOT NULL,
    "modal_licitacao" TEXT,
    "fSPId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,
    "servicoId" INTEGER NOT NULL,

    CONSTRAINT "ObjetoContrato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DadosContrato" (
    "id" SERIAL NOT NULL,
    "num_sesp" TEXT NOT NULL,
    "num_gms" TEXT,
    "protocolo" TEXT[],
    "num_licitacao" TEXT NOT NULL,
    "fSPId" INTEGER NOT NULL,
    "unidade" TEXT,
    "modal_licitacao" TEXT,

    CONSTRAINT "DadosContrato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contrato" (
    "id" SERIAL NOT NULL,
    "num_sesp" TEXT NOT NULL,
    "num_gms" TEXT,
    "protocolo" TEXT[],
    "num_licitacao" TEXT NOT NULL,
    "fsp" TEXT,
    "unidade" TEXT,
    "modalidade" TEXT,
    "status" TEXT NOT NULL,
    "internacional" BOOLEAN NOT NULL DEFAULT false,
    "fonte_material" TEXT NOT NULL,
    "responsavelId" INTEGER NOT NULL,

    CONSTRAINT "Contrato_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ObjetoContrato_num_licitacao_key" ON "ObjetoContrato"("num_licitacao");

-- CreateIndex
CREATE UNIQUE INDEX "DadosContrato_num_sesp_key" ON "DadosContrato"("num_sesp");

-- CreateIndex
CREATE UNIQUE INDEX "DadosContrato_num_gms_key" ON "DadosContrato"("num_gms");

-- CreateIndex
CREATE UNIQUE INDEX "DadosContrato_num_licitacao_key" ON "DadosContrato"("num_licitacao");

-- CreateIndex
CREATE UNIQUE INDEX "Contrato_num_sesp_key" ON "Contrato"("num_sesp");

-- CreateIndex
CREATE UNIQUE INDEX "Contrato_num_gms_key" ON "Contrato"("num_gms");

-- CreateIndex
CREATE UNIQUE INDEX "Contrato_num_licitacao_key" ON "Contrato"("num_licitacao");

-- AddForeignKey
ALTER TABLE "ObjetoContrato" ADD CONSTRAINT "ObjetoContrato_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjetoContrato" ADD CONSTRAINT "ObjetoContrato_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjetoContrato" ADD CONSTRAINT "ObjetoContrato_fSPId_fkey" FOREIGN KEY ("fSPId") REFERENCES "FSP"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DadosContrato" ADD CONSTRAINT "DadosContrato_fSPId_fkey" FOREIGN KEY ("fSPId") REFERENCES "FSP"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
