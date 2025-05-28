const express = require("express");

const bodyParser = require("body-parser");
const app = express();
const studentRoutes = require("./routes/student");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/students", studentRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
