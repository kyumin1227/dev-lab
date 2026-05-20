import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../App";

function formatDate(str) {
  return new Date(str).toLocaleDateString("ko-KR", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/posts/${id}`).then(res => setPost(res.data)).catch(() => navigate("/"));
    loadComments();
  }, [id]);

  function loadComments() {
    axios.get(`/api/posts/${id}/comments`).then(res => setComments(res.data));
  }

  async function handleDeletePost() {
    if (!window.confirm("게시글을 삭제하시겠습니까?")) return;
    await axios.delete(`/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    navigate("/");
  }

  async function handleAddComment(e) {
    e.preventDefault();
    if (!commentText.trim()) return;
    await axios.post(
      `/api/posts/${id}/comments`,
      { content: commentText },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    setCommentText("");
    loadComments();
  }

  async function handleDeleteComment(commentId) {
    await axios.delete(`/api/posts/${id}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    loadComments();
  }

  if (!post) return <p>불러오는 중...</p>;

  return (
    <>
      <div className="card">
        <div className="post-header">
          <h1>{post.title}</h1>
          <div className="post-meta" style={{ marginTop: 8 }}>
            <span>{post.username}</span>
            <span>{formatDate(post.created_at)}</span>
          </div>
        </div>
        <p className="post-content">{post.content}</p>
        <div className="actions">
          <a className="back-link" href="/" onClick={e => { e.preventDefault(); navigate("/"); }}>← 목록</a>
          {user?.userId === post.user_id && (
            <button className="btn btn-danger" onClick={handleDeletePost}>삭제</button>
          )}
        </div>
      </div>

      <div className="card">
        <h2>댓글 {comments.length}</h2>
        {comments.length === 0 && <p className="empty" style={{ padding: "20px 0" }}>댓글이 없습니다.</p>}
        {comments.map(c => (
          <div className="comment-item" key={c.id}>
            <div>
              <div className="comment-author">{c.username}</div>
              <div className="comment-content">{c.content}</div>
              <div className="comment-date">{formatDate(c.created_at)}</div>
            </div>
            {user?.userId === c.user_id && (
              <button className="btn btn-danger" onClick={() => handleDeleteComment(c.id)}>삭제</button>
            )}
          </div>
        ))}
        {user ? (
          <form className="comment-form" onSubmit={handleAddComment}>
            <input value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="댓글을 입력하세요" />
            <button className="btn btn-primary" type="submit">등록</button>
          </form>
        ) : (
          <p style={{ marginTop: 16, fontSize: 13, color: "#888" }}>
            댓글을 작성하려면 <Link to="/login">로그인</Link>하세요.
          </p>
        )}
      </div>
    </>
  );
}
