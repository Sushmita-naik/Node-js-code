const fs = require("fs"); // fs stands for file systems , this allow node js to read and write files on computer 

let users = [];

// Load users safely
try {
  const data = fs.readFileSync("users.json", "utf8");
  if (data) {
    users = JSON.parse(data);
  }
} catch (err) {
  console.log("users.json not found, starting with empty array");
}

// ---------- SIGNUP FUNCTION ----------
function signup(username, password) {
  const userExists = users.find(u => u.username === username);

  if (userExists) {
    console.log("User already exists");
    return;
  }

  users.push({ username, password });
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

  console.log("Signup successful");
}

// ---------- LOGIN FUNCTION ----------
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

// ----------- TESTING THE FUNCTIONS -------------
signup("admin", "1234");
login("admin", "1234"); // should succeed
login("admin", "0000"); // should fail
signup("admin", "4444"); // should say "User already exists"
