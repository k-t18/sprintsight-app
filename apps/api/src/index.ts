import "dotenv/config";
import express from "express";
import cors from "cors";
import notificationRoutes from "./routes/notifications.js";

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

// Routes
app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "api" });
});

app.use("/api/notifications", notificationRoutes);

// Start server
const port = Number(process.env.PORT ?? 4000);

app.listen(port, () => {
  console.log(`🚀 API running on http://localhost:${port}`);
});
