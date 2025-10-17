const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");

const UserModel = require("../models/Users");
const ProductModel = require("../models/Products");
const CartModel = require("../models/Cart");
const OrderModel = require("../models/Order");

// -----------------------------
// 🔧 CLOUDINARY CONFIG
// -----------------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ❌ REMOVED: Passport configuration (already in server.js)
// This was causing duplicate configuration and session issues

// -----------------------------
// 🏠 BASIC ROUTE
// -----------------------------
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the E-Commerce API 🚀" });
});

// -----------------------------
// 👤 AUTH ROUTES
// -----------------------------
router.post("/registerUser", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const newUser = new UserModel({ firstName, lastName, email });
    await UserModel.register(newUser, password);

    passport.authenticate("local")(req, res, () => {
      const safeUser = {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      };
      res.status(201).json({ message: "Registration successful", user: safeUser });
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

router.post("/loginUser", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).json({ message: info?.message || "Invalid credentials" });

    req.logIn(user, (err) => {
      if (err) return next(err);
      
      // ✅ Save session explicitly
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return res.status(500).json({ message: "Session error" });
        }
        
        const safeUser = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        };
        
        res.status(200).json({ 
          message: "Login successful", 
          user: safeUser,
          sessionID: req.sessionID // ✅ For debugging
        });
      });
    });
  })(req, res, next);
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((err) => {
      if (err) return next(err);

      // ✅ Clear cookie - let domain default in production
      res.clearCookie("connect.sid", {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });

      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

// ✅ Enhanced auth check
router.get("/checkAuth", (req, res) => {
  if (req.isAuthenticated()) {
    const safeUser = {
      _id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      role: req.user.role,
    };
    res.json({ isLoggedIn: true, user: safeUser });
  } else {
    res.json({ isLoggedIn: false, user: null });
  }
});

// ✅ Debug route (remove in production after fixing)
router.get("/debug/session", (req, res) => {
  res.json({
    sessionID: req.sessionID,
    isAuthenticated: req.isAuthenticated(),
    user: req.user ? {
      id: req.user._id,
      email: req.user.email
    } : null,
    hasSession: !!req.session,
    cookie: req.session?.cookie
  });
});

router.get("/userData", isLoggedIn, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).populate("orders");
    res.json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Error fetching user data" });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({ role: "customer" });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Update user status
router.put("/users/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: `User status updated to ${status}`,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------
// 🛍️ PRODUCT ROUTES
// -----------------------------

router.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product" });
  }
});

router.post("/addProduct", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = null;

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "ecommerce_products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    const { name, description, price, category, brand, stock } = req.body;

    const product = new ProductModel({
      name,
      description,
      price,
      category,
      brand,
      stock,
      image: imageUrl,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Error adding product", error: err.message });
  }
});

// -----------------------------
// 📦 ORDER ROUTES
// -----------------------------
router.post("/order", isLoggedIn, async (req, res) => {
  try {
    const cart = await CartModel.findOne({ user: req.user._id }).populate("items.product");
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const order = new OrderModel({
      user: req.user._id,
      items: cart.items,
      totalAmount: cart.totalPrice,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
    });

    await order.save();

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order placement failed" });
  }
});

router.get("/orders", isLoggedIn, async (req, res) => {
  try {
    const orders = await OrderModel.find({ user: req.user._id }).populate("items.product");
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// -----------------------------
// MIDDLEWARE
// -----------------------------
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
}

module.exports = router;