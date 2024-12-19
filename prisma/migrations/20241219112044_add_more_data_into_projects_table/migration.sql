/*
  Warnings:

  - You are about to drop the column `name` on the `Projects` table. All the data in the column will be lost.
  - Added the required column `thumbnail` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "name",
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "thumbnail" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "url" TEXT,
ALTER COLUMN "description" DROP NOT NULL;
