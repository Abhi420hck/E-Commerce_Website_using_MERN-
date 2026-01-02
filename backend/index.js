require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(cors());

// ================= DB CONNECTION =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// ================= BASIC API =================
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// ================= IMAGE UPLOAD (LOCAL ONLY FOR COMMIT) =================
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

// Upload endpoint (returns GitHub RAW URL)
app.post("/upload", upload.single("product"), (req, res) => {
  const githubRawUrl = `https://raw.githubusercontent.com/Abhi420hck/E-Commerce_Website_using_MERN-/main/backend/upload/images/${req.file.filename}`;

  res.json({
    success: 1,
    image_url: githubRawUrl,
  });
});

// ================= PRODUCT MODEL =================
const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

// ================= PRODUCT APIs =================
app.post("/addproduct", async (req, res) => {
  try {
    const products = await Product.find({});
    const id = products.length ? products[products.length - 1].id + 1 : 1;

    const product = new Product({ id, ...req.body });
    await product.save();

    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true });
});

app.get("/allproducts", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

app.get("/newcollection", async (req, res) => {
  const products = await Product.find({});
  res.json(products.slice(-8));
});

app.get("/popularinwomen", async (req, res) => {
  const products = await Product.find({ category: "women" });
  res.json(products.slice(-4));
});

// ================= USER MODEL =================
const Users = mongoose.model("Users", {
  name: String,
  email: { type: String, unique: true },
  password: String,
  cartData: Object,
  date: { type: Date, default: Date.now },
});

// ================= AUTH =================
app.post("/signup", async (req, res) => {
  const exists = await Users.findOne({ email: req.body.email });
  if (exists) {
    return res
      .status(400)
      .json({ success: false, error: "User already exists" });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password, // ⚠️ demo only (hash later)
    cartData: cart,
  });

  await user.save();

  const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET);
  res.json({ success: true, token });
});

app.post("/login", async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user || user.password !== req.body.password) {
    return res.json({ success: false, error: "Invalid credentials" });
  }

  const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET);
  res.json({ success: true, token });
});

// ================= AUTH MIDDLEWARE =================
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// ================= CART =================
app.post("/addtocart", fetchUser, async (req, res) => {
  const user = await Users.findById(req.user.id);
  user.cartData[req.body.itemId] += 1;
  await user.save();
  res.json({ success: true });
});

app.post("/removefromcart", fetchUser, async (req, res) => {
  const user = await Users.findById(req.user.id);
  if (user.cartData[req.body.itemId] > 0)
    user.cartData[req.body.itemId] -= 1;
  await user.save();
  res.json({ success: true });
});

app.post("/getcart", fetchUser, async (req, res) => {
  const user = await Users.findById(req.user.id);
  res.json(user.cartData);
});

// ================= MIGRATE OLD IMAGE URLS =================
app.post("/updateimages", async (req, res) => {
  const products = await Product.find({});
  for (let p of products) {
    const filename = p.image.split("/").pop();
    p.image = `https://raw.githubusercontent.com/Abhi420hck/E-Commerce_Website_using_MERN-/main/backend/upload/images/${filename}`;
    await p.save();
  }
  res.json({ success: true });
});

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
