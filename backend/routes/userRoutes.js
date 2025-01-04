const express = require("express");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} = require("../controllers/userController");
const authenticateJWT = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authenticateJWT, getAllUsers);
router.get("/:user_id", authenticateJWT, getUser);
router.put("/:user_id", authenticateJWT, updateUser);
router.delete("/:user_id", authenticateJWT, deleteUser);
router.post("/", authenticateJWT, createUser);

module.exports = router;
