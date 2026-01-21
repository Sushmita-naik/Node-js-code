const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/day1auth")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// User schema (database structure)
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

// Signup API
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const newUser = new User({ username, password: hashed });
  await newUser.save();

  res.json({ message: "Signup Successful" });
});

// Login API
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.json({ message: "Wrong password" });

  const token = jwt.sign({ username }, "SECRET123");

  res.json({ message: "Login Successful", token });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const users = [];

function signup(username, password) {
  const userExists = users.find(u => u.username === username);

  if (userExists) {
    console.log("User already exists");
    return;
  }

  users.push({ username, password });
  console.log("Signup successful");
}

function login(username, password) {
  const foundUser = users.find(u => u.username === username);

  if (!foundUser) {
    console.log("Invalid username");
    return;
  }

  if (foundUser.password !== password) {
    console.log("Incorrect password");
    return;
  }

  console.log("Login successful!");
}

signup("admin", "1234");
login("admin", "1234");
login("admin", "0000");
signup("admin", "4444");

const fs = require("fs");

function loadUsers() {
  const data = fs.readFileSync("user.json","utf-8");
  return JSON.parse(data);

}
function saveUsers(users) {
  fs.writeFileSync("user.json", JSON.stringify(users,null,2));
}

function signup(username, password) {
  const users = loadUsers();

  const userExists = users.find(u=>u.username === username);
  if(userExists) {
    console.log("User already exists");
    return;
  }
  users.push({ username , password});
  saveUsers(users);

  console.log("signup successfull!");
}
  function login(username , password) {
    const users = loadUsers();

    const user = user.find(u => u.username === username);
    if(!user) {
      console.log("Invalid username");
      return;
    }
    if(user,password !== password) {
      console.log("Incorrect password");
      return;
    }
    console.log("Login successful!");
  }

  signup("admin", "1234");
  login("admin","1234");
  login("admin","0000");
  signup("admin","9999");