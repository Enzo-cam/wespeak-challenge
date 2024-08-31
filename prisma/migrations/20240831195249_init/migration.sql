-- CreateTable
CREATE TABLE "Counter" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Counter_pkey" PRIMARY KEY ("id")
);
