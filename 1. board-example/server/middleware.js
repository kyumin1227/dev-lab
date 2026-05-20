const jwt = require("jsonwebtoken");
const JWT_SECRET = "board_secret_key";

function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  try {
    const token = auth.split(" ")[1];
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
}

module.exports = { authenticate };
