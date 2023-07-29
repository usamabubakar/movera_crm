const jwt = require("jsonwebtoken");
require('dotenv').config({ path: '../config/.env' });

// jwt secret key
const jwt_Secret_key = process.env.SECRET_KEY;

const fetchuser = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization');
  console.log("token ha ya",token)

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid token' });

  }

  // Extract the token value without the "Bearer " prefix
  const tokenValue = token.slice(7);
  try {
    const data = jwt.verify(tokenValue, jwt_Secret_key);
    req.user_login = data.user;
    console.log(req.user_login)
    next();
  } catch (error) {
    console.log("Token error:", error);
    return res.status(401).json({ error: 'Invalid token' });

  }
};

module.exports = fetchuser;
