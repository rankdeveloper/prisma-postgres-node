const pool = require("../connectDb");

const getAllStudents = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM student");
    res.json(data.rows);
  } catch (error) {
    console.log(error.message);
  }
};

const getStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await pool.query("SELECT * FROM student WHERE id = $1", [id]);
    res.json(data.rows);
  } catch (error) {
    console.log(error.message);
  }
};

const createStudent = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const data = await pool.query(
      "INSERT INTO student (name, phone) VALUES ($1, $2) RETURNING *",
      [name, phone]
    );
    res.json(data.rows);
  } catch (error) {
    console.log(error.message);
  }
};

const updateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, phone } = req.body;
    const data = await pool.query(
      "UPDATE student SET name = $1, phone = $2 WHERE id = $3 RETURNING *",
      [name, phone, id]
    );
    res.json(data.rows);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await pool.query("DELETE FROM student WHERE id = $1", [id]);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
