const express = require("express");
const db = require("../db");
const { authenticate } = require("../middleware");

const router = express.Router();

router.get("/", (req, res) => {
  const posts = db
    .prepare(
      `SELECT posts.id, posts.title, posts.created_at,
              users.username,
              COUNT(comments.id) AS comment_count
       FROM posts
       JOIN users ON posts.user_id = users.id
       LEFT JOIN comments ON comments.post_id = posts.id
       GROUP BY posts.id
       ORDER BY posts.created_at DESC`
    )
    .all();
  res.json(posts);
});

router.get("/:id", (req, res) => {
  const post = db
    .prepare(
      `SELECT posts.*, users.username
       FROM posts
       JOIN users ON posts.user_id = users.id
       WHERE posts.id = ?`
    )
    .get(req.params.id);

  if (!post) return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
  res.json(post);
});

router.post("/", authenticate, (req, res) => {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ message: "제목과 내용을 입력하세요." });

  const result = db
    .prepare("INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)")
    .run(title, content, req.user.id);
  res.status(201).json({ message: "게시글 작성 완료", postId: result.lastInsertRowid });
});

router.delete("/:id", authenticate, (req, res) => {
  const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(req.params.id);
  if (!post) return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
  if (post.user_id !== req.user.id)
    return res.status(403).json({ message: "권한이 없습니다." });

  db.prepare("DELETE FROM comments WHERE post_id = ?").run(req.params.id);
  db.prepare("DELETE FROM posts WHERE id = ?").run(req.params.id);
  res.json({ message: "삭제 완료" });
});

module.exports = router;
