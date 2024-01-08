/*
  Warnings:

  - You are about to drop the column `created_at` on the `skill` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `skill` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `skill` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `skill` table. All the data in the column will be lost.
  - You are about to drop the column `url_image` on the `skill` table. All the data in the column will be lost.
  - Added the required column `name` to the `skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `skill` DROP COLUMN `created_at`,
    DROP COLUMN `image`,
    DROP COLUMN `title`,
    DROP COLUMN `updated_at`,
    DROP COLUMN `url_image`,
    ADD COLUMN `name` VARCHAR(100) NOT NULL,
    ADD COLUMN `type` ENUM('Frontend', 'Backend', 'Other') NOT NULL DEFAULT 'Other';
