const pool = require("../connectDb");

const createCourse = async (req, res) => {
  try {
    const { id, name, fee } = req.body;

    const data = await pool.query(
      "INSERT INTO course (id, name, fee) VALUES ($1, $2, $3) RETURNING name",
      [id, name, fee]
    );

    res.status(201).json({
      message: "Course created successfully",
      courseName: data.rows[0].name,
    });
  } catch (error) {
    console.error("Error creating course:", error.message);
    res.status(500).json({ message: "Failed to create course", error });
  }
};

const updateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, fee } = req.body;
    const data = await pool.query(
      "UPDATE course  set name = $1 , fee = $2 where id = $3 returning name",
      [name, fee, id]
    );

    res
      .status(200)
      .json({ message: `${data.rows[0].name} Course updated successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update course , ", error });
  }
};
const getCourses = async (req, res) => {
  try {
    const data = await pool.query("select * from course");

    res.status(200).json(data.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch courses , ", error });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await pool.query(
      "DELETE FROM course WHERE id = $1 RETURNING name",
      [id]
    );
    res.status(201).json({
      message: "Course delete successfully",
      courseName: data.rows[0].name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete course , ", error });
  }
};

module.exports = { createCourse, updateCourse, getCourses, deleteCourse };
