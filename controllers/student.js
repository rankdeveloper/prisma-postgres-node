const pool = require("../connectDb");
const { PrismaClient } = require("../generated/prisma");
const superjson = require("superjson");

const prisma = new PrismaClient();

//for postgres
// const getAllStudents = async (req, res) => {
//   try {
//     const data = await pool.query("SELECT * FROM student");
//     res.json(data.rows);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

//for prisma ----------------------------------

const getAllStudents = async (req, res) => {
  try {
    const data = await prisma.student.findMany();
    const serialized = superjson.serialize(data);
    res.status(200).json(serialized.json);
  } catch (error) {
    console.log("Error while fetching data", error.message);
    res.status(500).json({ message: "Error while fetching data", error });
  }
};

//for postgres -------------------------
// const getStudent = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const data = await pool.query("SELECT * FROM student WHERE id = $1", [id]);
//     res.json(data.rows);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

//for prisma -----------------------

const getStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await prisma.student.findUnique({
      where: {
        id: Number(id),
      },
    });
    const serialized = superjson.serialize(data);

    res.status(200).json(serialized.json);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "Error while fetching a student , ",
      error,
    });
  }
};

//for postgres
// const createStudent = async (req, res) => {
//   try {
//     const { name, phone } = req.body;
//     const data = await pool.query(
//       "INSERT INTO student (name, phone) VALUES ($1, $2) RETURNING *",
//       [name, phone]
//     );
//     res.json(data.rows);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

//for prisma
const createStudent = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const data = await prisma.student.create({
      data: {
        name,
        phone,
      },
    });

    const serialized = superjson.serialize(data);
    res.status(200).json(serialized.json);
  } catch (error) {
    res.status(500).json({
      message: "Error while creating a student , ",
      error,
    });
  }
};

//for postgres ------------------------------------
// const updateStudent = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { name, phone } = req.body;
//     const data = await pool.query(
//       "UPDATE student SET name = $1, phone = $2 WHERE id = $3 RETURNING *",
//       [name, phone, id]
//     );
//     res.json(data.rows);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

//for prisma ----------------------------------
const updateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, phone } = req.body;

    const data = await prisma.student.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        phone,
      },
    });

    const serialized = superjson.serialize(data);
    res.status(200).json(serialized.json);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating a student , ", error });
  }
};

//for postgres --------------------------------
// const deleteStudent = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const data = await pool.query("DELETE FROM student WHERE id = $1", [id]);
//     res.json({ message: "Student deleted successfully" });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

//for prisma

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await prisma.student.delete({
      where: {
        id: Number(id),
      },
    });

    const serialized = superjson.serialize(data);
    res.status(200).json(serialized.json);
  } catch (error) {
    res.status(500).json({
      message: "Error while deleting a student , ",
      error,
    });
  }
};

module.exports = {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
