import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

function validationRequest(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ error: 'No token provided' });
    
    const parts = authHeader.split(' ');
    const [ schema, token ] = parts;
    
    if (schema.toLowerCase().trim() != 'bearer') return res.status(401).send({ error: 'invalid jwt schema' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token invalid' });
        
        req.userId = decoded.userId;
        req.admin = decoded.admin;
        req.name = decoded.name;
        req.email = decoded.login;
        
        return next();
    })
}

export default validationRequest;