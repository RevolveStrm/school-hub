-- CreateEnum
CREATE TYPE "ConfirmationTokenType" AS ENUM ('CONFIRM_EMAIL', 'FORGOT_PASSWORD');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_email_verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ConfirmationToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "is_expired" BOOLEAN NOT NULL DEFAULT false,
    "type" "ConfirmationTokenType" NOT NULL DEFAULT 'CONFIRM_EMAIL',
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "ConfirmationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConfirmationToken_token_key" ON "ConfirmationToken"("token");

-- CreateIndex
CREATE INDEX "ConfirmationToken_user_id_token_idx" ON "ConfirmationToken"("user_id", "token");

-- AddForeignKey
ALTER TABLE "ConfirmationToken" ADD CONSTRAINT "ConfirmationToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
