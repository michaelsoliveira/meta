-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "TipoPessoa" AS ENUM ('F', 'J');

-- CreateTable
CREATE TABLE "estado" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "uf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ddd" SMALLINT,

    CONSTRAINT "estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "endereco" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cep" VARCHAR(10),
    "logradouro" VARCHAR(50),
    "municipio" VARCHAR(50),
    "complemento" VARCHAR(50),
    "bairro" VARCHAR(50),
    "id_estado" UUID,

    CONSTRAINT "endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoa" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" "TipoPessoa" NOT NULL DEFAULT 'F',
    "id_endereco" UUID,

    CONSTRAINT "pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoa_fisica" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "nome" VARCHAR(100),
    "rg" VARCHAR(30),
    "cpf" VARCHAR(14),
    "data_nascimento" DATE NOT NULL,
    "id_pessoa" UUID,

    CONSTRAINT "pessoa_fisica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoa_juridica" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "nome_fantasia" VARCHAR(100),
    "razao_social" VARCHAR(100),
    "ins_estadual" VARCHAR(40),
    "ins_municipal" VARCHAR(40),
    "cnpj" VARCHAR(20),
    "data_constituicao" DATE NOT NULL,
    "id_pessoa" UUID,

    CONSTRAINT "pessoa_juridica_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_fisica_cpf_key" ON "pessoa_fisica"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_fisica_id_pessoa_key" ON "pessoa_fisica"("id_pessoa");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_juridica_cnpj_key" ON "pessoa_juridica"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_juridica_id_pessoa_key" ON "pessoa_juridica"("id_pessoa");

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "estado"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_id_endereco_fkey" FOREIGN KEY ("id_endereco") REFERENCES "endereco"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa_fisica" ADD CONSTRAINT "pessoa_fisica_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa_juridica" ADD CONSTRAINT "pessoa_juridica_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
