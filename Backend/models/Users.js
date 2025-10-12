// models/User.js
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  profileImage: { type: String, default: "/images/default.png" },
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["active", "disabled"], default: "active" },
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", UserSchema);
