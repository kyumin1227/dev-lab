import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../App";

function formatDate(str) {
  return new Date(str).toLocaleDateString("ko-KR", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function BoardList() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/posts").then(res => setPosts(res.data));
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1>게시글 목록</h1>
        {user && <button className="btn btn-primary" onClick={() => navigate("/write")}>글쓰기</button>}
      </div>
      <div className="card">
        {posts.length === 0 ? (
          <p className="empty">아직 게시글이 없습니다.</p>
        ) : (
          posts.map(post => (
            <div className="post-item" key={post.id} onClick={() => navigate(`/posts/${post.id}`)}>
              <h3>{post.title}</h3>
              <div className="post-meta">
                <span>{post.username}</span>
                <span>{formatDate(post.created_at)}</span>
                <span>댓글 {post.comment_count}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
