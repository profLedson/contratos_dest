-- CreateEnum
CREATE TYPE "TipoTransaction" AS ENUM ('RECEITA', 'DESPESA');

-- CreateTable
CREATE TABLE "transacao" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(32) NOT NULL,
    "descricao" VARCHAR(100),
    "valor" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "tipo" "TipoTransaction" NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "transacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transacao_titulo_key" ON "transacao"("titulo");

-- AddForeignKey
ALTER TABLE "transacao" ADD CONSTRAINT "transacao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
