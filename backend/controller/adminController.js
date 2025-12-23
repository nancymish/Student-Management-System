const User = require("../model/userModel");

// GET DASHBOARD STATS

const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });

    // Count distinct courses
    const courses = await User.distinct("course", { role: "student" });
    const totalCourses = courses.length;

    // New enrollments (students created in last 7 days)
    const newEnrollments = await User.countDocuments({
      role: "student",
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    res.status(200).json({ totalStudents, totalCourses, newEnrollments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};

// GET ALL STUDENTS
const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select(
      "name email"
    );

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

// DELETE STUDENT
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete student" });
  }
};

// ADD STUDENT
const addStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;  // Removed course

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, Email, and Password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Student already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student"
      // course removed
    });

    res.status(201).json({ message: "Student added successfully", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add student" });
  }
};




// EDIT STUDENT
const editStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, course } = req.body;

    const student = await User.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.name = name || student.name;
    student.email = email || student.email;

    await student.save();

    res.status(200).json({ message: "Student updated successfully", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to edit student" });
  }
};

// UPDATE STUDENT
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;  // Removed course

    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    const student = await User.findByIdAndUpdate(
      id,
      { name, email }, // Removed course
      { new: true }
    );

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ message: "Student updated successfully", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update student" });
  }
};

module.exports = { updateStudent };

module.exports = { getDashboardStats, getAllStudents, deleteStudent, addStudent, editStudent, updateStudent };