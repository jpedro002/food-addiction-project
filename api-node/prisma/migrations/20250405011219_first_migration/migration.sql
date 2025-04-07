-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'HEALTHCARE_AGENT');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "name" VARCHAR(90) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_food_addiction_answers" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "q1" SMALLINT,
    "q2" SMALLINT,
    "q3" SMALLINT,
    "q4" SMALLINT,
    "q5" SMALLINT,
    "q6" SMALLINT,
    "q7" SMALLINT,
    "q8" SMALLINT,
    "q9" SMALLINT,
    "q10" SMALLINT,
    "q11" SMALLINT,
    "q12" SMALLINT,
    "q13" SMALLINT,
    "origem" VARCHAR(30),
    "identificador_paciente" VARCHAR(30),

    CONSTRAINT "form_food_addiction_answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "form_food_addiction_answers" ADD CONSTRAINT "form_food_addiction_answers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
