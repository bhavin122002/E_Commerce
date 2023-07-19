require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/products");
const UserSchema = require("./models/loginSchema");
const ProductJson = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await Product.deleteMany();
    await Product.create(ProductJson);
    await UserSchema.create(UserSchema);
    console.log("Successfully created...");
  } catch (error) {
    console.log(error);
  }
};

start();