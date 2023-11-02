/*
  Warnings:

  - Added the required column `profile` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url_profile` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `profile` VARCHAR(100) NOT NULL,
    ADD COLUMN `url_profile` TEXT NOT NULL;
