// const db = require("../config/db");
const jwt = require("jsonwebtoken");

exports.registerUser = (req, res) => {
  const { email, password, role } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    db.query(
      "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
      [email, password, role],
      (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Error registering user" });
        }
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, role: user.role },
      process.env.JWT_SECRET
    );

    res.status(200).json({ message: "Login successful", token });
  });
};
