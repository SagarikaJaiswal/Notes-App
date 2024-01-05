const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const authenticateUser = (req, res, next) => {
  // Extract the JWT token from the request headers or cookies
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token not provided" });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, secret); // Replace 'yourSecretKey' with your actual secret key
    // Attach user information to the request object
    req.user = decoded;
    console.log(decoded);
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authenticateUser;
