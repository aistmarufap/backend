const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Routes = require("../routes/route.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ NOT CONNECTED TO NETWORK", err));

// Default Root Route (to avoid "Cannot GET /")
app.get("/", (req, res) => {
  res.send("🚀 Express + MongoDB Server is Running!");
});

// API Routes
app.use("/api", Routes);

// Start server (only for local development)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server started at port no. ${PORT}`);
  });
}

// Export app (needed for Vercel deployment)
module.exports = app;
