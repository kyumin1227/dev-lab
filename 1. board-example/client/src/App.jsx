import React, { createContext, useContext, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import BoardList from "./pages/BoardList";
import PostDetail from "./pages/PostDetail";
import PostCreate from "./pages/PostCreate";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav>
      <Link to="/">게시판</Link>
      <div className="nav-right">
        {user ? (
          <>
            <span>{user.username}님</span>
            <button onClick={() => { logout(); navigate("/"); }}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/register">회원가입</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  const stored = localStorage.getItem("auth");
  const [user, setUser] = useState(stored ? JSON.parse(stored) : null);

  const login = (data) => { setUser(data); localStorage.setItem("auth", JSON.stringify(data)); };
  const logout = () => { setUser(null); localStorage.removeItem("auth"); };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <BrowserRouter>
        <Navbar />
        <div className="container" style={{ marginTop: 24 }}>
          <Routes>
            <Route path="/" element={<BoardList />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/write" element={user ? <PostCreate /> : <Navigate to="/login" />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
