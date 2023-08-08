require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const cors = require("cors");

// Express middleware
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5500;

app.get("/", (req, res) => {
  res.send("Hii I Am Live");
});

/* ------------  images  ------------ */
app.use("/images", express.static("images"));

// middleware or to set Products router
app.use("/api/products", require("./routes/products"));

// middleware or to set Login And register,logout,Coustemer List  routes
app.use("/login", require("./routes/user"));
app.use("/coustemer", require("./routes/user"));
app.use("/register", require("./routes/user"));
app.use("/logout", require("./routes/user"));

// middleware or to set category routes
app.use("/category", require("./routes/category"));

// middleware or to set Add To Cart routes
app.use("/addtocart", require("./routes/AddToCart"));

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT} Yes I Am Connected 👍👍`);
    });
  } catch (error) {
    console.log("ERROR ❌❌", error);
  }
};

start();
