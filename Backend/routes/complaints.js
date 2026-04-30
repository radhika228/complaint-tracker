const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Complaint = require("../models/Complaint");
const authMiddleware = require("../middleware/auth");

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) cb(null, true);
  else cb(new Error("Only image files are allowed."));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

// GET /api/complaints — all complaints (public)
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// GET /api/complaints/mine — current user's complaints
router.get("/mine", authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// POST /api/complaints — create complaint (auth required)
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description)
      return res.status(400).json({ message: "Title and description are required." });

    const complaint = await Complaint.create({
      title,
      description,
      image: req.file ? req.file.filename : null,
      user: req.user.id,
      userName: req.user.name,
    });

    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// PATCH /api/complaints/:id/status — update status (auth required, owner only)
router.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["Pending", "In Review", "Resolved"];
    if (!allowed.includes(status))
      return res.status(400).json({ message: "Invalid status." });

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found." });
    if (complaint.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized." });

    complaint.status = status;
    await complaint.save();
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// DELETE /api/complaints/:id — delete (auth required, owner only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found." });
    if (complaint.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized." });

    await complaint.deleteOne();
    res.json({ message: "Complaint deleted." });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

module.exports = router;
