const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const connectDB = require("./db");
const MongoStore = require("connect-mongo");

// Routers & Models
const indexRouter = require("./routes/index");
const User = require("./models/Users");

dotenv.config();

const app = express();
app.set("trust proxy", "1");
// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// ✅ CORS - Allow both localhost AND production frontend
const allowedOrigins = [
  "http://localhost:5173",
  "https://veloura-rose.vercel.app", //
  process.env.FRONTEND_URL, // Set this in Vercel environment variables
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"], // ✅ Add this
  })
);
// ✅ Express Session - Use environment variable for secret

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    name: "veloura_session",
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      ttl: 24 * 60 * 60,
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // false for local (HTTP), true for prod (HTTPS)
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "lax" for local, "none" for prod
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
// ✅ Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Configure Passport using the User model
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Health Check Route (must come before other routes)
app.get("/", (req, res) => {
  res.json({
    message: "Server is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res, next) => {
  console.log("🔍 Headers:", req.headers);
  console.log("🍪 Cookies:", req.cookies);
  console.log("📝 Session ID:", req.sessionID);
  console.log("👤 Session:", req.session);
  console.log("✅ Authenticated:", req.isAuthenticated?.());
  next();
});
// API Routes
app.use("/", indexRouter); // Changed from "/" to "/api" for better structure

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start Server (only for local development)
const PORT = process.env.PORT || 8000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export for Vercel
module.exports = app;
