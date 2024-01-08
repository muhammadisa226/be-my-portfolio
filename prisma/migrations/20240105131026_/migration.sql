/*
  Warnings:

  - The required column `id` was added to the `technologies` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `technologies` ADD COLUMN `id` VARCHAR(100) NOT NULL;
