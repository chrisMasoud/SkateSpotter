const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const session = require("express-session");
const mysql = require("mysql");
const fs = require("fs");
const bodyParser = require("body-parser");
const md5 = require("md5");
const app = express();

app.use(express.json());
app.use(fileUpload());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
const { createProxyMiddleware: proxy } = require("http-proxy-middleware");
app.use(
  "/skate-spotter",
  proxy("http://localhost:3000", {
    proxyReqPathResolver: (req) => {
      return `/skate-spotter${req.url}`;
    },
  })
);
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

/*
app.get("/api/searchspots", (req, res) => {
  const { keyword } = req.query;
  const query = `SELECT * FROM SkateSpot WHERE SpotName LIKE '%${keyword}%'`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching news data:", error);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.json(results);
    }
  });
});
*/

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
      req.session.uid = results[0].UserID;
      req.session.user = email;
      res.json({
        message: "Login successful! Click OK to be redirected.",
        user: results[0],
        redirect: "/",
      });
    } else {
      res.status(401).json({
        error: "Invalid username or password.  Please re-attempt login.",
      });
    }
  });
});

app.post("/api/google-login", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required!" });
  }
  const query = `SELECT * FROM Users WHERE email = '${email}'`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error sending login query:", err);
      res.status(500).json({ error: "Internal error :( try again later" });
      return;
    }
    if (results.length > 0) {
      req.session.uid = results[0].UserID;
      req.session.user = email;
      res.json({
        message: "Login successful! Click OK to be redirected.",
        user: results[0],
        redirect: "/",
      });
    } else {
      res.status(401).json({
        error:
          "Invalid email address.  Please re-attempt login or register an account.",
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

  const conflict_check = `SELECT * FROM Users WHERE email = '${s_email}'`;
  connection.query(conflict_check, (err, results) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal error :( try again later" });
    }

    if (results.length > 0) {
      return res.json({
        message:
          "An account with this email already exists.  Click OK and you will be redirected to the login page.",
        redirect: "/LoginPage",
      });
    }

    const query = `INSERT INTO Users (FirstName, LastName, ZIP, Email, Password) VALUES ('${s_firstname}', '${s_lastname}', '${s_zip}', '${s_email}', '${hash}')`;
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error sending registration query:", err);
        res.status(500).json({ error: "Internal error :( try again later" });
        return;
      }
      return res.status(200).json({
        redirect: "/LoginPage",
        message:
          "Registration successful!  Click OK and you will be redirected to the login page.",
      });
    });
  });
});

app.post("/api/upload", (req, res) => {
  if (!req.files || !req.files.image || !req.body.uid) {
    return res.status(400).json({ error: "Invalid HTTP request" });
  }

  const image = req.files.image;
  const uid = req.body.uid;
  const filename = randomfilename(image.name);
  const filepath = __dirname + "/public/uploads/" + filename;
  image.mv(filepath, (err) => {
    if (err) {
      console.error("Error saving the file:", err);
      return res.status(500).json({ error: "Failed to upload the file" });
    }
    const relativepath = "/uploads/" + filename;
    const query = `UPDATE Users SET Avatar = '${relativepath}' WHERE UserID = ${uid}`;
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error updating user profile:", err);
        return res
          .status(500)
          .json({ error: "Failed to update user profile in database" });
      }
      res.json({ relativepath });
    });
  });
});

function randomfilename(file) {
  const ext = file.split(".").pop();
  const rand = `${Date.now()}_${Math.floor(Math.random() * 99999)}.${ext}`;
  return rand;
}

app.get("/api/getprofileimage/:uid", (req, res) => {
  const uid = req.params.uid;
  const query = `SELECT Avatar FROM Users WHERE UserID = ${uid}`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching user avatar:", err);
      return res
        .status(500)
        .json({ error: "Unable to fetch user avatar from db" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Uid not found in database" });
    }

    const url = results[0].Avatar;
    res.json({ url });
  });
});

app.get("/api/getzip/:uid", (req, res) => {
  const uid = req.params.uid;
  const query = "SELECT ZIP FROM Users WHERE UserID = ?";
  connection.query(query, [uid], (err, results) => {
    if (err) {
      console.error("Error fetching user ZIP:", err);
      return res
        .status(500)
        .json({ error: "Unable to fetch user ZIP from db" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Uid not found in database" });
    }

    const zip = results[0].ZIP;
    res.json({ zip });
  });
});

app.post("/add-spot", (req, res) => {
  const {
    spotName,
    latitude,
    longitude,
    spotRating,
    spotDescription,
    difficulty,
  } = req.body;
  const spotImage = req.files.spotImage;
  const imageFileName = `${Date.now()}-${spotImage.name}`;
  spotImage.mv(path.join(__dirname, "public/uploads", imageFileName), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error uploading image");
    }

    const sql =
      "INSERT INTO SkateSpot (SpotName, Latitude, Longitude, Rating, Descriptions, Spotimage, difficulty) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(
      sql,
      [
        spotName,
        latitude,
        longitude,
        spotRating,
        spotDescription,
        imageFileName,
        difficulty,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error inserting data into the database");
        }
        console.log("Spot added successfully");
        res.status(200).send("Spot added successfully");
      }
    );
  });
});

app.post("/api/bookmarks", (req, res) => {
  const { SpotID, UserID } = req.body;

  const query = `INSERT INTO Bookmarks (SpotID, UserID) VALUES (?, ?)`;
  const values = [SpotID, UserID];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Failed to add bookmark:", error);
      res.status(500).send("Failed to add bookmark");
    } else {
      console.log("Bookmark added successfully!");
      res.status(200).send("Bookmark added successfully");
    }
  });
});

app.post("/api/reports", (req, res) => {
  const { SpotID } = req.body;

  const insertQuery = "INSERT INTO Reports (SpotID) VALUES (?)";
  connection.query(insertQuery, [SpotID], (error, results) => {
    if (error) {
      console.error("Error inserting SpotID:", error);
      res.status(500).json({ error: "Failed to insert SpotID." });
    } else {
      res.json({ message: "SpotID inserted successfully." });
    }
  });
});

app.get("/api/bookmarks/:userId", (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT SkateSpot.*
    FROM SkateSpot
    INNER JOIN Bookmarks ON SkateSpot.SpotID = Bookmarks.SpotID
    WHERE Bookmarks.UserID = ?
  `;

  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error("Failed to fetch bookmarks:", error);
      res.status(500).json({ error: "Failed to fetch bookmarks" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/reviews/:spotId", (req, res) => {
  const spotId = req.params.spotId;

  const query = `
    SELECT *
    FROM Review
    WHERE Review.spotID = ?
  `;

  connection.query(query, [spotId], (error, results) => {
    if (error) {
      console.error("Failed to fetch reviews:", error);
      res.status(500).json({ error: "Failed to fetch reviews" });
    } else {
      res.json(results);
    }
  });
});

app.post("/add-review", (req, res) => {
  const { title, rating, description, spotId } = req.body;
  const sql =
    "INSERT INTO Review (reviewTitle, rating, reviewText, spotID) VALUES (?, ?, ?, ?)";
  connection.query(sql, [title, rating, description, spotId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error inserting data into the database");
    }
    console.log("Review added successfully");
    res.status(200).send("Review added successfully");
  });
});

app.get("/api/getprofile/:uid", (req, res) => {
  const uid = req.params.uid;
  const query = `SELECT * FROM Users WHERE UserID = ${uid}`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Unable to fetch user from db" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Uid not found in database" });
    }

    const user = results[0];
    return res.status(200).json(user);
  });
});

app.post("/support", (req, res) => {
  const { name, email, description } = req.body;
  const sql = "INSERT INTO Support (name, email, description) VALUES (?, ?, ?)";
  connection.query(sql, [name, email, description], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error inserting data into the database");
    }
    console.log("Claim added successfully");
    res.status(200).send("Claim added successfully");
  });
});

app.post("/api/update-profile", (req, res) => {
  const { uid, firstName, lastName, zip, biography } = req.body;

  const sql = `
    UPDATE Users
    SET FirstName = ?, LastName = ?, ZIP = ?, biography = ?
    WHERE UserID = ?
  `;
  connection.query(
    sql,
    [firstName, lastName, zip, biography, uid],
    (error, results) => {
      if (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Failed to update user profile" });
      } else {
        console.log("User profile updated successfully");
        res.json({ message: "User profile updated successfully" });
      }
    }
  );
});

app.post("/api/update-spot", (req, res) => {
  const {
    spotID,
    spotName,
    latitude,
    longitude,
    spotRating,
    difficulty,
    description,
  } = req.body;
  const sql = `
    UPDATE SkateSpot
    SET SpotName = ?, Latitude = ?, Longitude = ?, Rating = ?, difficulty = ?, Descriptions = ? 
    WHERE SpotID = ?
  `;
  connection.query(
    sql,
    [
      spotName,
      latitude,
      longitude,
      spotRating,
      difficulty,
      description,
      spotID,
    ],
    (error, results) => {
      if (error) {
        console.error("Error updating spot:", error);
        res.status(500).json({ message: "Failed to update spot" });
      } else {
        console.log("Spot updated successfully");
        res.json({ message: "Spot updated successfully" });
      }
    }
  );
});

app.post("/api/delete-spot", (req, res) => {
  const { spotID } = req.body;
  const sql = `
    DELETE FROM SkateSpot
    WHERE SpotID = ?
  `;
  connection.query(sql, [spotID], (error, results) => {
    if (error) {
      console.error("Error deleting spot:", error);
      res.status(500).json({ message: "Failed to delete spot" });
    } else {
      console.log("Spot deleted successfully");
      res.json({ message: "Spot deleted successfully" });
    }
  });
});

app.get("/api/about", (req, res) => {
  const query = `
    SELECT *
    FROM Developers
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Failed to fetch devs:", error);
      res.status(500).json({ error: "Failed to fetch devs" });
    } else {
      res.json(results);
    }
  });
});

// This MUST be at the bottom
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
