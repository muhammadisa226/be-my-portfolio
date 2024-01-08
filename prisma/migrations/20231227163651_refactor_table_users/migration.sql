/*
  Warnings:

  - You are about to drop the column `profile` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `url_profile` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `profile`,
    DROP COLUMN `url_profile`,
    ADD COLUMN `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);
