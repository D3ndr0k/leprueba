import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authToken = req.cookies.token;

  if (!authToken) {
    return res.json({ error: "No token provided" });
  }

  jwt.verify(authToken, process.env.KEY_TOKEN, (err, user) => {
    if (err) {
      return res.json({ error: "Token is not valid" });
    }

    req.user = user;
    next();
  });
};

export default authenticateToken;
