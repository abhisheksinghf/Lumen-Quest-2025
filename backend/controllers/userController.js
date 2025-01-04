let users = [
  {
    user_id: 1,
    username: "admin",
    email: "admin@example.com",
    password: "adminpass",
    role: "Admin",
  },
  {
    user_id: 2,
    username: "manager",
    email: "manager@example.com",
    password: "managerpass",
    role: "Manager",
  },
  {
    user_id: 3,
    username: "staff",
    email: "staff@example.com",
    password: "staffpass",
    role: "Staff",
  },
];

const getAllUsers = (req, res) => {
  res.status(200).json(users);
};

const getUser = (req, res) => {
  const { user_id } = req.params;
  const user = users.find((u) => u.user_id === parseInt(user_id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
};

const updateUser = (req, res) => {
  const { user_id } = req.params;
  const { username, email, role } = req.body;

  const userIndex = users.findIndex((u) => u.user_id === parseInt(user_id));

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[userIndex] = {
    ...users[userIndex],
    username,
    email,
    role,
  };

  res.status(200).json({ message: "User updated successfully" });
};

const deleteUser = (req, res) => {
  const { user_id } = req.params;
  const userIndex = users.findIndex((u) => u.user_id === parseInt(user_id));

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(userIndex, 1);

  res.status(200).json({ message: "User deleted successfully" });
};

const createUser = (req, res) => {
  const { username, email, password, role } = req.body;

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    user_id: users[users.length - 1].id + 1,
    username,
    email,
    password,
    role,
    created_at: new Date(),
  };

  users.push(newUser);

  res.status(201).json({ message: "User created successfully", user: newUser });
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
};
