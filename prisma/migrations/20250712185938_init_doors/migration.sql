-- CreateTable
CREATE TABLE "Door" (
    "id" SERIAL NOT NULL,
    "week" INTEGER NOT NULL,
    "opened" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Door_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Door_week_key" ON "Door"("week");
