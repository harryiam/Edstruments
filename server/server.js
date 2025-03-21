import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const DATA_FILE = './data.json';

// Helper function to read users
const getUsers = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
};

// Helper function to save users
const saveUsers = (users) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
};

// 🔹 LOGIN Endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// 🔹 REGISTER Endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  let users = getUsers();

  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = { username, password };
  users.push(newUser);
  saveUsers(users);

  res.json({ message: 'Registration successful', user: newUser });
});

// 🔹 Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
