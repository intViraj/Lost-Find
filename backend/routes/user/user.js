import express from "express";
import bcrypt from "bcryptjs";
import User from "../../models/users/users.js";
import Post from "../../models/posts/posts.js";
import upload from "../../middleware/uploadimages.js"
import { deleteFromCloudinary,uploadToCloudinary } from "../../utils/cloudinary.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const router = express.Router();


/**
 * Optional authentication middleware:
 * Tries to verify token if present, but doesn’t block request if not.
 */
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const user = verifyToken(token); // You may need to slightly adjust verifyToken to return decoded data instead of sending res
      req.user = user;
    } catch (err) {
      // Ignore invalid token; continue as unauthenticated
      console.warn("Invalid token (optionalAuth):", err.message);
    }
  }
  next();
};


// 🧾 GET USER STATS (Public + Auth)
router.get("/stats", optionalAuth, async (req, res) => {
  try {
    let userId = req.user?.id;

    // If no authenticated user, return general stats (for all users)
    if (!userId) {
      const totalPosts = await Post.countDocuments();

      return res.status(200).json({
        totalPosts,
      });
    }

    // If authenticated, return personal stats
    const totalPosts = await Post.countDocuments({ userId });

    res.status(200).json({
      totalPosts,
    });
  } catch (err) {
    console.error("User stats error:", err);
    res.status(500).json({ error: err.message });
  }
});


// 👤 GET USER BY ID (Public + Auth)
router.get("/users/:id", optionalAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // don’t return sensitive info

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Get user by ID error:", err);
    res.status(500).json({ error: err.message });
  }
});


// DELETE USER (Admin or Self)
router.delete("/users/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent admin from deleting their own account
    if (req.user.isAdmin && req.user.id === req.params.id) {
      return res
        .status(403)
        .json({ message: "Admin cannot delete their own account" });
    }

    // Prevent normal users from deleting others
    if (!req.user.isAdmin && req.user.id !== req.params.id) {
      return res
        .status(403)
        .json({ message: "You can only delete your own account" });
    }

    // Delete profile picture if exists
    if (user.profilePic?.publicId) {
      await deleteFromCloudinary(user.profilePic.publicId);
    }

    // 2️⃣ Delete user’s posts and images
    const userPosts = await Post.find({ userId: user._id });
    for (const post of userPosts) {
      for (const image of post.images) {
        await deleteFromCloudinary(image.publicId);
      }
    }

    // 3️⃣ Remove user-related data
    await Post.deleteMany({ userId: user._id });
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Account and all associated content deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE USER (Edit Profile)
router.put(
  "/edit/:id",
  verifyToken,
  upload.single("profilePic"), // same middleware as post/profile upload
  async (req, res) => {
    try {
      const userId = req.params.id;

      // Only allow self or admin
      if (req.user.id !== userId && !req.user.isAdmin) {
        return res.status(403).json({ message: "Unauthorized to update this user" });
      }

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      const { studentname, email, password, college_year, department } = req.body;

      if (studentname) user.studentname = studentname;
      if (email) user.email = email;
      if (college_year) user.college_year = college_year;
      if (department) user.department = department;

      // Password update
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }

      // Profile picture update
      if (req.file) {
        // Delete old picture
        if (user.profilePic?.publicId) {
          await deleteFromCloudinary(user.profilePic.publicId);
        }

        // Upload new picture
        const uploaded = await uploadToCloudinary(req.file, "profile-pics");
        user.profilePic = {
          url: uploaded.secure_url,
          publicId: uploaded.public_id,
        };
      }

      await user.save();
      res.status(200).json({ message: "User updated successfully", user });
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
