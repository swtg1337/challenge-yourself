/*
  Warnings:

  - The primary key for the `Challenge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Challenge` table. All the data in the column will be lost.
  - Added the required column `title` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_pkey",
DROP COLUMN "name",
ADD COLUMN     "completedDays" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "totalDays" DROP NOT NULL,
ADD CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Challenge_id_seq";
