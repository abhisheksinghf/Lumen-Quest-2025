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

// router.get("/", authenticateJWT, getAllUsers);
// router.get("/:user_id", authenticateJWT, getUser);
// router.put("/:user_id", authenticateJWT, updateUser);
// router.delete("/:user_id", authenticateJWT, deleteUser);
// router.post("/", authenticateJWT, createUser);

router.get("/", getAllUsers);
router.get("/:user_id", getUser);
router.put("/:user_id", updateUser);
router.delete("/:user_id", deleteUser);
router.post("/", createUser);

module.exports = router;
