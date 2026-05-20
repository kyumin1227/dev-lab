import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../App";

export default function PostCreate() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/posts", form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      navigate(`/posts/${res.data.postId}`);
    } catch (err) {
      setError(err.response?.data?.message || "오류가 발생했습니다.");
    }
  }

  return (
    <div className="card">
      <h1>글쓰기</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>제목</label>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="제목을 입력하세요" />
        </div>
        <div className="form-group">
          <label>내용</label>
          <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="내용을 입력하세요" />
        </div>
        {error && <p className="error">{error}</p>}
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-primary" type="submit">등록</button>
          <button className="btn btn-secondary" type="button" onClick={() => navigate(-1)}>취소</button>
        </div>
      </form>
    </div>
  );
}
