-- CreateTable
CREATE TABLE "product" (
    "product_id" TEXT NOT NULL,
    "product_image_url" TEXT NOT NULL,
    "product_price" TEXT NOT NULL,
    "product_title" TEXT NOT NULL,
    "product_rating" TEXT NOT NULL,
    "product_category_group" TEXT NOT NULL,
    "product_location" TEXT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("product_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_product_id_key" ON "product"("product_id");
