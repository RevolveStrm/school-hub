/*
  Warnings:

  - You are about to drop the `ConfirmationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConfirmationToken" DROP CONSTRAINT "ConfirmationToken_user_id_fkey";

-- DropTable
DROP TABLE "ConfirmationToken";

-- CreateTable
CREATE TABLE "confirmation_token" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "is_expired" BOOLEAN NOT NULL DEFAULT false,
    "type" "ConfirmationTokenType" NOT NULL DEFAULT 'CONFIRM_EMAIL',
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "confirmation_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "confirmation_token_token_key" ON "confirmation_token"("token");

-- CreateIndex
CREATE INDEX "confirmation_token_user_id_token_idx" ON "confirmation_token"("user_id", "token");

-- AddForeignKey
ALTER TABLE "confirmation_token" ADD CONSTRAINT "confirmation_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
