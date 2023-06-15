const express = require("express");
const mysql = require("mysql");
const fs = require("fs");
const app = express();

const thumbnailData = fs.readFileSync(
  "C:\\Users\\Cgmas\\OneDrive\\Documents\\SkateSpotter\\skate-spotter\\public\\ollieThumbnail.jpg"
);

const connection = mysql.createConnection({
  host: "skate-spotter.cev1k4udhkyr.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "skatespotter",
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
  connection.query("USE SkateSpotter", (err, result) => {
    if (err) {
      console.error("Error selecting the database:", err);
      return;
    }
  });
  console.log("Database selected successfully!");
  connection.query("SELECT * FROM Tutorials", (err, rows) => {
    if (err) {
      console.error("Error querying the table:", err);
      return;
    }
    rows.forEach((row) => {
      console.log(`${row.title}`);
    });
  });
  // // Create the database
  // connection.query("CREATE DATABASE IN NOT EXISTS SkateSpotter", (err, result) => {
  //   if (err) {
  //     console.error("Error creating the database:", err);
  //     return;
  //   }
  //   console.log("Database created successfully!");
  // });
  // // Use database
  // connection.query("USE SkateSpotter", (err, result) => {
  //   if (err) {
  //     console.error("Error selecting the database:", err);
  //     return;
  //   }
  // });
  // console.log("Database selected successfully!");
  // // Create table
  // connection.query(
  //   `
  //   CREATE TABLE IF NOT EXISTS Tutorials (
  //     tutorialID INT AUTO_INCREMENT PRIMARY KEY,
  //     title VARCHAR(255),
  //     creator VARCHAR(255),
  //     url VARCHAR(255),
  //     description VARCHAR(255),
  //     thumbnail BLOB
  //   )
  // `,
  //   (error, results, fields) => {
  //     if (error) {
  //       console.error("Error creating table:", error);
  //       res.status(500).send("Error creating table");
  //       return;
  //     }
  //     console.log("Table created successfully!");

  //     // Insert a row
  //     const video = {
  //       title: "How To Ollie In Under 4 Minutes",
  //       creator: "CCS",
  //       url: "https://www.youtube.com/watch?v=KJnZvKwgZaA",
  //       description:
  //         "The root of all tricks, the Ollie, join us as our host Dale shows us an in depth look out how to Ollie. He breaks down every aspect of the Ollie to help you learn the right way. Unlocking the Ollie opens up a whole world of opportunities on your skateboarding journey! ",
  //       thumbnail: thumbnailData,
  //     };

  //     connection.query(
  //       "INSERT INTO Tutorials SET ?",
  //       video,
  //       (error, results, fields) => {
  //         if (error) {
  //           console.error("Error inserting row:", error);
  //           res.status(500).send("Error inserting row");
  //           return;
  //         }
  //         console.log("Row inserted successfully!");

  //         res.send("Table created and row inserted successfully!");
  //       }
  //     );
  //   }
  // );
  connection.end((err) => {
    if (err) {
      console.error("Error closing the database connection:", err);
      return;
    }
    console.log("Database connection closed successfully!");
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
