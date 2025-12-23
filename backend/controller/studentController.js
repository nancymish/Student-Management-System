const User = require("../model/userModel");


// GET student profile
exports.getProfile = async (req, res) => {
  try {
    const student = await User.findById(req.user.id).select("-password");
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE student profile
exports.updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.name,
        course: req.body.course,
      },
      { new: true }
    );

    res.status(200).json({ updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE student account
exports.deleteProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.clearCookie("token");
    res.status(200).json({ message: "Account deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};