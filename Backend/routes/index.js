const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const multer = require("multer");
const fs = require("fs");
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

// -----------------------------
// 🔐 PASSPORT CONFIGURATION
// -----------------------------
passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

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
      res
        .status(201)
        .json({ message: "Registration successful", user: safeUser });
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
      return res
        .status(401)
        .json({ message: info?.message || "Invalid credentials" });

    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return next(err);
      }

      // ✅ CRITICAL: Explicitly save session before responding
      req.session.save((saveErr) => {
        if (saveErr) {
          console.error("Session save error:", saveErr);
          return res.status(500).json({ message: "Session creation failed" });
        }

        const safeUser = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        };

        // ✅ Log for debugging
        console.log("✅ User logged in:", safeUser.email);

        console.log("✅ Session:", req.session);

        res.status(200).json({
          message: "Login successful",
          user: safeUser,
          // Remove in production, just for debugging:
          debug: {
            sessionID: req.sessionID,
            hasSession: !!req.session,
          },
        });
      });
    });
  })(req, res, next);
});
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    // Destroy the session completely
    req.session.destroy((err) => {
      if (err) return next(err);

      // ✅ Clear the cookie with ALL necessary attributes
      res.clearCookie("veloura_session", {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });

      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

router.get("/userData", isLoggedIn, async (req, res) => {
  const user = await UserModel.findById(req.user._id).populate("orders");
  res.json({ user });
});

// Get all users
router.get("/users", async (req, res) => {
  const users = await UserModel.find({ role: "customer" });
  res.json(users);
});

// Update user status
router.put("/users/:id/status", async (req, res) => {
  try {
    const { status } = req.body; // e.g. { status: "disabled" }

    // Validate input
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // return the updated document
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

// Get all products
router.get("/products", async (req, res) => {
  const products = await ProductModel.find();
  res.json(products);
});

// Get single product
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
          {
            folder: "ecommerce_products",
            // Add these transformations for further optimization
            transformation: [
              { width: 1200, height: 1200, crop: "limit" },
              { quality: "auto:good" },
              { fetch_format: "auto" },
            ],
            flags: "lossy",
          },
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
    res
      .status(500)
      .json({ message: "Error adding product", error: err.message });
  }
});

// -----------------------------
// 📦 ORDER ROUTES
// -----------------------------
router.post("/order", isLoggedIn, async (req, res) => {
  try {
    // Get cart from request body instead of req.cart
    const { username, cart, shippingAddress, paymentMethod } = req.body;

    console.log("Received cart:", cart);

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Format items to match Order schema
    const orderItems = cart.map((item) => ({
      product: item._id, // Use the product ID from cart
      quantity: item.quantity,
    }));

    // Calculate total amount from cart items
    const totalAmount = cart.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const order = new OrderModel({
      user: req.user._id,
      username: username,
      items: orderItems,
      totalAmount: totalAmount,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod || "COD",
    });

    await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    console.error("Order placement error:", err);
    res.status(500).json({
      message: "Order placement failed",
      error: err.message,
    });
  }
});

router.post("/orders/:orderId/status", isLoggedIn, async (req, res) => {
  try {
    const { status } = req.body;
    const { orderId } = req.params;

    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Failed to update order status:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
});

router.get("/getOrders", isLoggedIn, async (req, res) => {
  const orders = await OrderModel.find();
  res.json(orders);
});

router.get("/getUserOrders", isLoggedIn, async (req, res) => {
  const orders = await OrderModel.find({ email: req.email });
  res.json(orders);
});

// -----------------------------
// MIDDLEWARES
// -----------------------------
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
}

router.get("/checkAuth", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isLoggedIn: true, user: req.user });
  } else {
    res.json({ isLoggedIn: false });
  }
});

module.exports = router;
