const express = require("express");
const mysql = require("mysql");
const fs = require("fs");
const bodyParser = require("body-parser");
const md5 = require("md5");
const app = express();
app.use(express.json());

const connection = mysql.createConnection({
  host: "skate-spotter.cev1k4udhkyr.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "skatespotter",
  database: "SkateSpotter",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to the database!");
});

/*
const thumbnailData = fs.readFileSync(
  "C:\\Users\\Cgmas\\OneDrive\\Documents\\SkateSpotter\\skate-spotter\\public\\manualThumbnail.jpg"
);

app.get("/api", (req, res) => {
  const query = "UPDATE Tutorials SET thumbnail = ? WHERE tutorialID = ?";
  connection.query(query, [thumbnailData, 6], (err, results) => {
    if (err) {
      console.error("Error inserting blob:", err);
      res.status(500).send("Error inserting blob");
      return;
    }
    res.send("Blob inserted successfully!");
  });
});
*/

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const hash = md5(password);
  const query = `SELECT * FROM Users WHERE email = '${email}' AND password = '${hash}'`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error sending login query:", err);
      res.status(500).json({ error: "Internal error :( try again later" });
      return;
    }
    if (results.length > 0) {
      res.json({ message: "Login successful!" });
    } else {
      res.status(401).json({
        error: "Invalid username or password.  Please re-attempt login.",
      });
    }
  });
});

function sanitize(str) {
  if (typeof str !== "string") return "";
  const san = str.replace(/<\/?[^>]+(>|$)/g, "");
  const esc = htmlspecialchars(san);
  return esc;
}

function htmlspecialchars(str) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return str.replace(/[&<>"']/g, (m) => map[m]);
}

app.post("/api/signup", (req, res) => {
  const { firstname, lastname, zip, email, password, confirm } = req.body;
  console.log(req.body);
  if (!firstname || !lastname || !zip || !email || !password || !confirm) {
    return res
      .status(400)
      .json({ error: "All fields are required.  Please try again." });
  }

  if (password !== confirm) {
    return res.status(400).json({
      error: "Password and confirm password do not match.  Please try again.",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      error: "Password must be at least 6 characters.  Please try again.",
    });
  }

  if (
    !/[a-z]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    return res.status(400).json({
      error:
        "Passwords require one of each: lowercase letters, uppercase letters, numbers.  Please try again.",
    });
  }

  const hash = md5(password);
  const s_firstname = sanitize(firstname);
  const s_lastname = sanitize(lastname);
  const s_zip = sanitize(zip);
  const s_email = sanitize(email);

  const query = `INSERT INTO Users (FirstName, LastName, ZIP, Email, Password) VALUES ('${s_firstname}', '${s_lastname}', '${s_zip}', '${s_email}', '${hash}')`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error sending registration query:", err);
      res.status(500).json({ error: "Internal error :( try again later" });
      return;
    }
    res.json({ message: "Registration successful!" });
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
