const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = function (req,res,next) {
    
    const secret = process.env.SECRET_KEY;

    try {
        // on definit où trouver le token
        let token = req.header('Authorization');

        // si pas de token alors message echec
        if(!token) res.status(403).json('Acces unauthorized !');

        // verificaiton intégrité du token 
            // succes : retourne le payload
            // fail : throw error au catch  
        const verify = jwt.verify(token, secret);
        // assignation du payload au req.user
        req.user = verify;

        // si pas admin alors message echec
        if(req.user.role != "admin") res.status(401).json('Not enough permissions to accces this area !')
        
        // si token + admin on passe au next
        next();


    } catch (err) {
        res.status(403).json('unvalid or expired token !');
    }

}