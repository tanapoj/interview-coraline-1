-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `score` INTEGER NOT NULL DEFAULT 0,
    `highScore` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `User_name_key`(`name`),
    UNIQUE INDEX `User_password_key`(`password`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
