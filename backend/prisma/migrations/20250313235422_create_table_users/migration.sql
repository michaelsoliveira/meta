-- AlterTable
ALTER TABLE "pessoa" ADD COLUMN     "id_user" UUID;

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" VARCHAR NOT NULL,
    "email" VARCHAR,
    "password" VARCHAR,
    "image" VARCHAR,
    "email_verified" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
