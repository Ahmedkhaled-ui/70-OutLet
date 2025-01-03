const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
const PORT = 3000;

// سياسة CORS للمجالات المحددة فقط
const corsOptions = {
  origin: [
    "http://192.168.1.9:3000",
    "https://your-frontend-domain.vercel.app",
  ],
};
app.use(cors(corsOptions));
app.use(express.json());

// تكوين Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// إعداد Multer لتخزين الصور في الذاكرة فقط
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // الحد الأقصى لحجم الصورة 10 ميغابايت
});

// نقطة رفع الصور
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "لم يتم اختيار صورة" });
    }

    // رفع الصورة إلى Cloudinary
    cloudinary.uploader
      .upload_stream({ folder: "uploads" }, (error, result) => {
        if (error) {
          console.error("خطأ أثناء رفع الصورة:", error);
          return res.status(500).json({ error: "حدث خطأ أثناء رفع الصورة" });
        }

        const imageUrl = result.secure_url;

        // إرجاع الرابط فقط
        res.json({ message: "تم رفع الصورة بنجاح!", url: imageUrl });
      })
      .end(req.file.buffer);
  } catch (error) {
    console.error("خطأ أثناء رفع الصورة:", error);
    res.status(500).json({ error: "حدث خطأ أثناء رفع الصورة" });
  }
});

// نقطة استرجاع الصورة الأخيرة فقط
app.get("/images", (req, res) => {
  res.status(404).json({ error: "لا توجد صور مرفوعة" }); // لم يعد هناك صورة ثابتة، سيُطلب رفع صورة جديدة
});

app.listen(PORT, () => {
  console.log(`Server is running on http://192.168.1.9:${PORT}`);
});
