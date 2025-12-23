  const express = require("express");
  const { register, login, logout } = require('../controller/authController');   
  const {
    getProfile,
    updateProfile,
    deleteProfile,
  } = require("../controller/studentController");
  const {
    getDashboardStats,
    getAllStudents,
    deleteStudent,
    addStudent, editStudent, updateStudent
  } = require("../controller/adminController");
  const { authorisation, isAdmin } = require("../middleware/authMiddleware");
  const router = express.Router();

  router.post('/register', register);
  router.post('/login', login);
  router.post('/logout',authorisation, logout);

  router.get("/profile", authorisation, getProfile);
  router.put("/profile", authorisation, updateProfile);
  router.delete("/profile", authorisation, deleteProfile);

  router.get("/stats", authorisation, isAdmin, getDashboardStats);
  router.get("/students", authorisation, isAdmin, getAllStudents);
  router.delete("/students/:id", authorisation, isAdmin, deleteStudent);
  router.put("/students/:id", authorisation, isAdmin, updateStudent);
  router.post("/students", authorisation, isAdmin, addStudent);

  module.exports = router;