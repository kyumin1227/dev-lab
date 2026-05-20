const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();
const JWT_SECRET = "board_secret_key";

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "아이디와 비밀번호를 입력하세요." });

  const existing = db.prepare("SELECT id FROM users WHERE username = ?").get(username);
  if (existing) return res.status(409).json({ message: "이미 사용 중인 아이디입니다." });

  const hashed = bcrypt.hashSync(password, 10);
  const result = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(username, hashed);
  res.status(201).json({ message: "회원가입 완료", userId: result.lastInsertRowid });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);

  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).json({ message: "아이디 또는 비밀번호가 틀렸습니다." });

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "24h",
  });
  res.json({ token, username: user.username, userId: user.id });
});

module.exports = router;
