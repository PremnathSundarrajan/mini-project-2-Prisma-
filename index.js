const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    //Data from Frontend

    //DB logic
    const data = await prisma.restaurant.findMany();
    console.log(data);

    //Data to Frontend
    res.status(200).json({ data: data, message: "All items are fetched Successfully" });
  } catch (err) {
    res.status(500).json({ err: err, message: "Internal Server Error" });
  }
});

app.get("/get", async (req, res) => {
  try {
    //Data from Frontend
    const { id } = req.headers;

    //DB logic
    const data = await prisma.restaurant.findUnique({
      where: { restaurant_id: id },
    });

    if (!data) {
      return res.status(404).json({ message: `Restaurant ${id} not Found` });
    }

    //Data to Frontend
    res.status(200).json({ data: data, message: "Restaurant Found" });
  } catch (err) {
    res.status(500).json({ err: err, message: "Internal Server Error" });
  }
});

app.post("/restaurants", async (req, res) => {
  try {
    //Data from Frontend
    const data = req.body;

    //DB logic
    const add = await prisma.restaurant.create({
      data: {
        restaurant_image_url: data.restaurant_image_url,
        restaurant_price: data.restaurant_price,
        restaurant_title: data.restaurant_title,
        restaurant_rating: data.restaurant_rating,
        restaurant_category_group: data.restaurant_category_group,
        restaurant_location: data.restaurant_location,
      },
    });
    console.log(add);

    //Data to Frontend
    res.status(200).json({ data: add, message: "Created Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Error" });
  }
});

app.put("/restaurants/update", async (req, res) => {
  try {
    //Data from Frontend
    const data = req.body;

    //DB logic
    const check = await prisma.restaurant.findUnique({
      where: { restaurant_id: data.restaurant_id },
    });

    if (!check) {
      return res.status(404).json({ message: "Restaurant Not Found" });
    }
    const upd = await prisma.restaurant.update({
      where: { restaurant_id: data.restaurant_id },
      data,
    });

    //Data to Frontend
    res.status(200).json({ data: upd, message: "Updated Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.patch("/restaurants/specific/update", async (req, res) => {
  try {
    //Data from Frontend
    const data = req.body;

    //DB logic
    const check = await prisma.restaurant.findUnique({
      where: { restaurant_id: data.restaurant_id },
    });

    if (!check) {
      return res.json(404).json({ message: "Data Not found" });
    }

    const update = await prisma.restaurant.update({
      where: { restaurant_id: data.restaurant_id },
      data,
    });

    //Data to Frontend
    res.status(200).json({ data: update, message: "updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/delete", async (req, res) => {
  try {
    //Data from Frontend
    const { id } = req.query;

    //DB logic
    const get = await prisma.restaurant.findUnique({
      where: { restaurant_id: id },
    });

    if (!get) return res.status(404).json({ message: "Data is missing" });

    const del = await prisma.restaurant.delete({
      where: { restaurant_id: id },
    });

    //Data to Frontend
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running");
});
