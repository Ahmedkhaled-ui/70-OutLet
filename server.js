const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "لم يتم اختيار صورة" });
  }

  cloudinary.uploader
    .upload_stream({ folder: "uploads" }, (error, result) => {
      if (error) {
        console.error("خطأ أثناء رفع الصورة:", error);
        return res.status(500).json({ error: "حدث خطأ أثناء رفع الصورة" });
      }

      res.json({ message: "تم رفع الصورة بنجاح!", url: result.secure_url });
    })
    .end(req.file.buffer);
});

app.get("/images", (req, res) => {
  res.json({ message: "لا توجد صور حالياً." });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
