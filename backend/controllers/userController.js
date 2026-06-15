import User from "../models/User.js";

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Server error retrieving profile" });
  }
};

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.skills = req.body.skills || user.skills;
      user.interests = req.body.interests || user.interests;
      user.goals = req.body.goals || user.goals;
      user.targetCareer = req.body.targetCareer || user.targetCareer;
      
      if (req.body.education) {
        user.education = {
          degree: req.body.education.degree || user.education.degree,
          college: req.body.education.college || user.education.college,
          year: req.body.education.year || user.education.year,
          cgpa: req.body.education.cgpa || user.education.cgpa,
        };
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        skills: updatedUser.skills,
        interests: updatedUser.interests,
        education: updatedUser.education,
        goals: updatedUser.goals,
        targetCareer: updatedUser.targetCareer,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Server error updating profile" });
  }
};
