import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../App";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/auth/login", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "로그인 실패");
    }
  }

  return (
    <div className="card" style={{ maxWidth: 400, margin: "0 auto" }}>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>아이디</label>
          <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} placeholder="아이디 입력" />
        </div>
        <div className="form-group">
          <label>비밀번호</label>
          <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="비밀번호 입력" />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="btn btn-primary" type="submit" style={{ width: "100%" }}>로그인</button>
      </form>
      <p style={{ marginTop: 14, fontSize: 13, textAlign: "center" }}>
        계정이 없으신가요? <Link to="/register">회원가입</Link>
      </p>
    </div>
  );
}
