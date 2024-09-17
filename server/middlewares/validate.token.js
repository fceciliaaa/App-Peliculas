const jwt = require('jsonwebtoken');
const clave = "esto_es_secreto";

const validateToken = (req, res, next) => {
    const token_user = req.headers.token_user;

    jwt.verify(token_user, clave, (error, decoded) => {
        if(error){
            return res.status(401).json({message: "No autorizado para ver este contenido."});
        }
        req.infoUser = {
            _id: decoded._id, 
            name: decoded.name,
            lastName: decoded.lastName,
            email: decoded.email
        }
        next();
    });
}

module.exports = validateToken;