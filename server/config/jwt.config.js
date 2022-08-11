const jwt = require("jsonwebtoken");
const secret = "cazuela";

module.exports.secret = secret;

module.exports.authenticate = (req, res, next) => {

  jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
    if (err) { 
      res.status(401).json({verified: false, msg:"credencailes invalidas, debe logearse nuevamente"});
    } else {
      console.log(payload)
      res.locals.user = payload._id; 
      next();
      
    }
  });

}

