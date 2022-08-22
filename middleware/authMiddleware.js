const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookie.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("./login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    return res.redirect("/login");
  }
};
module.exports = { requireAuth };
