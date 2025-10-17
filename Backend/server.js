const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const mongoose = require("mongoose");
const connectDB = require("./db");

// Routers & Models
const indexRouter = require("./routes/index");
const User = require("./models/Users");

dotenv.config();

const app = express();
app.set("trust proxy", 1);

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// ✅ CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://veloura-rose.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ MongoDB Session Store (persists sessions across serverless instances)
app.use(
  session({
    secret: "helloMydesiNigga1956",
    name: "connect.sid",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      touchAfter: 24 * 3600, // Lazy update session (once per 24h)
      crypto: {
        secret: "helloMydesiNigga1956",
      },
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // true in production
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ CRITICAL for cross-origin
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

// Health Check Route
app.get("/", (req, res) => {
  res.json({
    message: "Server is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/", indexRouter);

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

module.exports = app;
