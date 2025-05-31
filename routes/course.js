const express = require("express");
const router = express.Router();

const {
  createCourse,
  updateCourse,
  getCourses,
  deleteCourse,
} = require("../controllers/course");

router.post("/", createCourse);
router.get("/", getCourses);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);
module.exports = router;
