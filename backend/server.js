const express = require("express");
const mysql = require("mysql");
const fs = require("fs");
const app = express();

const thumbnailData = fs.readFileSync(
  "C:\\Users\\Cgmas\\OneDrive\\Documents\\SkateSpotter\\skate-spotter\\public\\manualThumbnail.jpg"
);

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

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
