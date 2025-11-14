// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const restaurants = [
    {
      restaurant_image_url: "https://example.com/res1.jpg",
      restaurant_price: "₹250–₹500",
      restaurant_title: "Spice Garden",
      restaurant_rating: "4.5",
      restaurant_category_group: "Indian",
      restaurant_location: "Chennai"
    },
    {
      restaurant_image_url: "https://example.com/res2.jpg",
      restaurant_price: "₹300–₹700",
      restaurant_title: "Ocean Breeze Café",
      restaurant_rating: "4.2",
      restaurant_category_group: "Seafood",
      restaurant_location: "Bangalore"
    },
    {
      restaurant_image_url: "https://example.com/res3.jpg",
      restaurant_price: "₹150–₹400",
      restaurant_title: "Street Bites",
      restaurant_rating: "4.7",
      restaurant_category_group: "Fast Food",
      restaurant_location: "Hyderabad"
    }
  ];

  for (const restaurant of restaurants) {
    await prisma.restaurant.create({
      data: restaurant
    });
  }

  console.log("🌱 Restaurant seed inserted successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
