const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./util/db");
const cors = require("cors");  
const authRoute = require("./routes/authRoutes");

dotenv.config();
const app = express();

// Connect to the database
connectDB();

app.use(
  cors({
    origin: "https://student-management-system-topaz-chi.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Backend running...");
});


app.use(cookieParser());
app.use(express.json());

app.use("/api/", authRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});