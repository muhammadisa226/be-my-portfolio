/*
  Warnings:

  - You are about to drop the column `portfolioId` on the `technologies` table. All the data in the column will be lost.
  - Added the required column `technologyId` to the `portfolios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `technologies` DROP FOREIGN KEY `technologies_portfolioId_fkey`;

-- AlterTable
ALTER TABLE `portfolios` ADD COLUMN `technologyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `technologies` DROP COLUMN `portfolioId`;

-- AddForeignKey
ALTER TABLE `portfolios` ADD CONSTRAINT `portfolios_technologyId_fkey` FOREIGN KEY (`technologyId`) REFERENCES `technologies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
