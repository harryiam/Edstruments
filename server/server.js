import express from 'express';
import fs from 'fs';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const DATA_FILE = path.join(process.cwd(), 'data.json');

// 🔹 In-memory Users (Fixes Render file reset issue)
let users = [];

// 🔹 Helper function to read users
const getUsers = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    users = JSON.parse(data);
  } catch (error) {
    console.error('Error reading users:', error);
    users = [];
  }
  return users;
};

// 🔹 Helper function to save users
const saveUsers = (newUsers) => {
  users = newUsers;
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

// 🔹 Get All Users (Debugging)
app.get('/users', (req, res) => {
  res.json(getUsers());
});

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
  console.log(`✅ Server is running on port ${PORT}`);
  getUsers(); // Load users into memory on startup
});
