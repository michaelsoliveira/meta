/*
  Warnings:

  - The primary key for the `pessoa_fisica` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `pessoa_fisica` table. All the data in the column will be lost.
  - The primary key for the `pessoa_juridica` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `pessoa_juridica` table. All the data in the column will be lost.
  - Made the column `id_pessoa` on table `pessoa_fisica` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_pessoa` on table `pessoa_juridica` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "pessoa_fisica" DROP CONSTRAINT "pessoa_fisica_id_pessoa_fkey";

-- DropForeignKey
ALTER TABLE "pessoa_juridica" DROP CONSTRAINT "pessoa_juridica_id_pessoa_fkey";

-- DropIndex
DROP INDEX "pessoa_fisica_id_pessoa_key";

-- DropIndex
DROP INDEX "pessoa_juridica_id_pessoa_key";

-- AlterTable
ALTER TABLE "pessoa_fisica" DROP CONSTRAINT "pessoa_fisica_pkey",
DROP COLUMN "id",
ALTER COLUMN "id_pessoa" SET NOT NULL,
ADD CONSTRAINT "pessoa_fisica_pkey" PRIMARY KEY ("id_pessoa");

-- AlterTable
ALTER TABLE "pessoa_juridica" DROP CONSTRAINT "pessoa_juridica_pkey",
DROP COLUMN "id",
ALTER COLUMN "id_pessoa" SET NOT NULL,
ADD CONSTRAINT "pessoa_juridica_pkey" PRIMARY KEY ("id_pessoa");

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "pessoa_fisica" ADD CONSTRAINT "pessoa_fisica_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa_juridica" ADD CONSTRAINT "pessoa_juridica_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
