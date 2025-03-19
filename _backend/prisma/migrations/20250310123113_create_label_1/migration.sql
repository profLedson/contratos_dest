-- CreateTable
CREATE TABLE "Contratos" (
    "id" SERIAL NOT NULL,
    "num_sesp" TEXT NOT NULL,
    "gms" TEXT,
    "protocolo" TEXT,
    "num_licitacao_disp" TEXT NOT NULL,
    "fsp" TEXT,
    "unidade" TEXT,
    "modal_licitacao" TEXT,

    CONSTRAINT "Contratos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contratos_num_sesp_key" ON "Contratos"("num_sesp");

-- CreateIndex
CREATE UNIQUE INDEX "Contratos_gms_key" ON "Contratos"("gms");

-- CreateIndex
CREATE UNIQUE INDEX "Contratos_protocolo_key" ON "Contratos"("protocolo");

-- CreateIndex
CREATE UNIQUE INDEX "Contratos_num_licitacao_disp_key" ON "Contratos"("num_licitacao_disp");
