const db = require("../config/db");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
};

// Get user by ID
const getUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE user_id = ?", [
      user_id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: err.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const userId = Date.now();
    await db.query(
      "INSERT INTO users (user_id, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
      [userId, username, email, password, role]
    );
    res
      .status(201)
      .json({ message: "User created successfully", user_id: userId });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({ message: "User with this email already exists" });
    } else {
      res
        .status(500)
        .json({ message: "Error creating user", error: err.message });
    }
  }
};

// Update user details
const updateUser = async (req, res) => {
  const { user_id } = req.params;
  const { username, email, role } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE users SET username = ?, email = ?, role = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?",
      [username, email, role, user_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM users WHERE user_id = ?", [
      user_id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
