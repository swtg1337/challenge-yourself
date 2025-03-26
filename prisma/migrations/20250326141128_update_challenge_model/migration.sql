-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "isCompletedToday" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastCompletedDate" TIMESTAMP(3);
