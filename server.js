const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Giả sử lưu user ở đây (có thể thay bằng DB sau)
const USERS_FILE = "./users.json";

// Hàm đọc dữ liệu người dùng từ file
function readUsers() {
    if (!fs.existsSync(USERS_FILE)) return [];
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);
}

// Hàm lưu người dùng
function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Đăng ký
app.post("/api/register", async (req, res) => {
    const { username, password } = req.body;

    const users = readUsers();
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(400).json({ message: "Tài khoản đã tồn tại!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    saveUsers(users);

    res.json({ message: "Đăng ký thành công!" });
});

// Đăng nhập
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu!" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu!" });
    }

    res.json({ message: "Đăng nhập thành công!", username });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
