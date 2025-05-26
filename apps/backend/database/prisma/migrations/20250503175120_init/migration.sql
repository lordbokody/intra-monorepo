-- CreateEnum
CREATE TYPE "Role" AS ENUM ('unverified', 'student', 'admin');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('emailNotConfirmed', 'partialRegistration', 'registered');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "birthday" TEXT,
    "registrationStatus" "RegistrationStatus" NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
