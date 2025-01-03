// const express = require("express");
// const multer = require("multer");
// const cloudinary = require("cloudinary").v2;
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");

// dotenv.config();

// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(express.json());

// // تكوين Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // ذاكرة مؤقتة لحفظ روابط الصور
// let uploadedImages = [];

// // إعداد Multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage });

// // نقطة رفع الصور
// app.post("/upload", upload.single("image"), async (req, res) => {
//   try {
//     const file = req.file.path;
//     const result = await cloudinary.uploader.upload(file, {
//       folder: "uploads",
//     });
//     const imageUrl = result.secure_url;

//     // إضافة رابط الصورة الجديدة إلى المصفوفة
//     uploadedImages.push(imageUrl); // حفظ الصورة في المصفوفة

//     res.json({ message: "تم رفع الصورة بنجاح!", url: imageUrl });
//   } catch (error) {
//     console.error("خطأ أثناء رفع الصورة:", error);
//     res.status(500).json({ error: "حدث خطأ أثناء رفع الصورة" });
//   }
// });

// // نقطة استرجاع الصور
// app.get("/images", (req, res) => {
//   res.json(uploadedImages); // إرسال كل الصور المرفوعة
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// تكوين Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// إعداد Multer لتخزين الصور في الذاكرة فقط
const storage = multer.memoryStorage();
const upload = multer({ storage });

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
  console.log(`Server is running on http://localhost:${PORT}`);
});
