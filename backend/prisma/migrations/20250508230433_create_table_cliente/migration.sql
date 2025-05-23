-- CreateTable
CREATE TABLE "cliente" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "pessoa_id" UUID NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cliente" ADD CONSTRAINT "cliente_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
