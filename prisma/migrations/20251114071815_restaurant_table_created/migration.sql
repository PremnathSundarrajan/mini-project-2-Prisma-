/*
  Warnings:

  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "product";

-- CreateTable
CREATE TABLE "Restaurant" (
    "restaurant_id" TEXT NOT NULL,
    "restaurant_image_url" TEXT NOT NULL,
    "restaurant_price" TEXT NOT NULL,
    "restaurant_title" TEXT NOT NULL,
    "restaurant_rating" TEXT NOT NULL,
    "restaurant_category_group" TEXT NOT NULL,
    "restaurant_location" TEXT NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("restaurant_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_restaurant_id_key" ON "Restaurant"("restaurant_id");
