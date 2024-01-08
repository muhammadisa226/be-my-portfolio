/*
  Warnings:

  - You are about to drop the column `technologyId` on the `portfolios` table. All the data in the column will be lost.
  - The primary key for the `technologies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `technologies` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `technologies` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `technologies` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `technologies` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `technologies` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `technologies` table. All the data in the column will be lost.
  - Added the required column `portfolio_id` to the `technologies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tool_id` to the `technologies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `portfolios` DROP FOREIGN KEY `portfolios_technologyId_fkey`;

-- AlterTable
ALTER TABLE `portfolios` DROP COLUMN `technologyId`;

-- AlterTable
ALTER TABLE `technologies` DROP PRIMARY KEY,
    DROP COLUMN `created_at`,
    DROP COLUMN `id`,
    DROP COLUMN `image`,
    DROP COLUMN `image_url`,
    DROP COLUMN `title`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `portfolio_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `tool_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`portfolio_id`, `tool_id`);

-- CreateTable
CREATE TABLE `tools_and_language` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `image` VARCHAR(100) NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `technologies` ADD CONSTRAINT `technologies_portfolio_id_fkey` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `technologies` ADD CONSTRAINT `technologies_tool_id_fkey` FOREIGN KEY (`tool_id`) REFERENCES `tools_and_language`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
