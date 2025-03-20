-- CreateTable
CREATE TABLE "perfil" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "foto" BYTEA,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "perfil_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "perfil_userId_key" ON "perfil"("userId");

-- AddForeignKey
ALTER TABLE "perfil" ADD CONSTRAINT "perfil_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
