const express = require("express");
const router = express.Router();

//for prisma -----------
// const {
//   getAllStudents,
//   getStudent,
//   createStudent,
//   updateStudent,
//   deleteStudent,
// } = require("../controllers/student");

//for postgres --------
const {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/student(postgres)");

router.get("/", getAllStudents);
router.get("/:id", getStudent);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
