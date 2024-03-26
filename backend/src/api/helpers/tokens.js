const jwt = require("jsonwebtoken");

const checkToken = (token, userId = null) => {
  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    console.log(">>>decoded: ", decoded);
    if (userId && decoded.userId !== userId) {
      throw new Error("Invalid Token");
    }
    return 1;
  } catch (error) {
    console.log("token error: ", error);
    return 0;
  }
};

module.exports = { checkToken };
