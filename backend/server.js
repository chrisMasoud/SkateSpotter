const express = require("express");
const session = require("express-session");
const mysql = require("mysql");
const fs = require("fs");
const bodyParser = require("body-parser");
const md5 = require("md5");
const app = express();
app.use(express.json());
app.use(
  session({
    secret: "replace-with-something-else",
    resave: false,
    saveUninitialized: false,
  })
);

// Database Connection
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

app.get("/api/spots", (req, res) => {
  const query = "SELECT * FROM SkateSpot";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching news data:", error);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/news", (req, res) => {
  const query = "SELECT * FROM News";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching news data:", error);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/tips", (req, res) => {
  const query = "SELECT * FROM Tutorials";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching tips data:", error);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.json(results);
    }
  });
});

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
      req.session.user = email;
      res.json({ message: "Login successful!", user: results[0]});
    } else {
      res.status(401).json({
        error: "Invalid username or password.  Please re-attempt login.",
      });
    }
  });
});

app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error closing session:", err);
      res.status(500).json({ error: "Internal error :( try again later" });
      return;
    }
    res.json({ message: "Logout successful!" });
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

// This MUST be at the bottom
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
