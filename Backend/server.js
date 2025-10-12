const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const connectDB = require("./db");

// Routers & Models
const indexRouter = require("./routes/index");
const User = require("./models/Users");

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// ✅ CORS must be configured before routes
app.use(
  cors({
    origin: "http://localhost:5173", // React app URL
    credentials: true,
  })
);

// ✅ Express Session (use a safer secret in production)
app.use(
  session({
    secret: "hey Nigga", // ❌ DO NOT use offensive words; change this to something secure like process.env.SESSION_SECRET
    resave: false,
    saveUninitialized: false,
  })
);

// ✅ Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Configure Passport using the User model
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use("/", indexRouter);

// Health Check Route
app.get("/", (req, res) => {
  res.json({ message: "Server is running 🚀" });
});

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
