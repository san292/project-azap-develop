const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  const secret = process.env.SECRET_KEY;
  console.log(`🚀 ~ file: checkConnected.js ~ line 6 ~ secret`, secret);

  try {
    let token = req.header('Authorization');
    console.log(`🚀 ~ file: checkConnected.js ~ line 11 ~ token`, token);

    if (!token) res.status(403).json('Acces unauthorized !');

    const verify = jwt.verify(token, secret);
    console.log(`🚀 ~ file: checkConnected.js ~ line 16 ~ verify`, verify);

    req.user = verify;
    console.log('test verify', verify);

    next();
  } catch (err) {
    res.status(403).json('unvalid token !');
  }
};
