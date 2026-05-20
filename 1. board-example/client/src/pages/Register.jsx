import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await axios.post("/api/auth/register", form);
      setSuccess("회원가입 완료! 로그인 해주세요.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "회원가입 실패");
    }
  }

  return (
    <div className="card" style={{ maxWidth: 400, margin: "0 auto" }}>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>아이디</label>
          <input
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="아이디 입력"
          />
        </div>
        <div className="form-group">
          <label>비밀번호</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="비밀번호 입력"
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p style={{ color: "green", fontSize: 13 }}>{success}</p>}
        <button className="btn btn-primary" type="submit" style={{ width: "100%" }}>
          회원가입
        </button>
      </form>
      <p style={{ marginTop: 14, fontSize: 13, textAlign: "center" }}>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </p>
    </div>
  );
}
