const express = require("express");
const db = require("../db");
const { authenticate } = require("../middleware");

const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
  const comments = db
    .prepare(
      `SELECT comments.*, users.username
       FROM comments
       JOIN users ON comments.user_id = users.id
       WHERE comments.post_id = ?
       ORDER BY comments.created_at ASC`
    )
    .all(req.params.postId);
  res.json(comments);
});

router.post("/", authenticate, (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: "댓글 내용을 입력하세요." });

  const post = db.prepare("SELECT id FROM posts WHERE id = ?").get(req.params.postId);
  if (!post) return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });

  const result = db
    .prepare("INSERT INTO comments (content, post_id, user_id) VALUES (?, ?, ?)")
    .run(content, req.params.postId, req.user.id);
  res.status(201).json({ message: "댓글 작성 완료", commentId: result.lastInsertRowid });
});

router.delete("/:commentId", authenticate, (req, res) => {
  const comment = db
    .prepare("SELECT * FROM comments WHERE id = ?")
    .get(req.params.commentId);
  if (!comment) return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
  if (comment.user_id !== req.user.id)
    return res.status(403).json({ message: "권한이 없습니다." });

  db.prepare("DELETE FROM comments WHERE id = ?").run(req.params.commentId);
  res.json({ message: "댓글 삭제 완료" });
});

module.exports = router;
