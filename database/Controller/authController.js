import { compare } from 'bcrypt';
import dotenv from 'dotenv';
import express from 'express';
import RedisCache from 'express-redis-cache';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

dotenv.config();
const router = express.Router();

let cache = RedisCache({
    prefix: 'users',
    host: 'redis',
    port: 6379,
});
  
cache.invalidate = (name) => {
    return (req, res, next) => {
        if (!cache.connected) {
            next();
            return ;
        }
        cache.del('/users/find*', () => console.log("Cache deleted"));
        cache.del('/users/get', () => console.log("Cache deleted"));
        next();
    }
}

cache.on('error', function (error) {
    throw new Error('Cache error: ' + error);
});

router.post('/session', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        const validPassword = await compare(req.body.password, user.password);

        if (!user || !validPassword) return res.status(400).send("Usuários com credenciais inválidas");
        
        const token = jwt.sign({
            userId: user._id,
            login: user.email,
            name: user.name,
            admin: user.admin
        }, process.env.JWT_SECRET, { expiresIn: 86400 });
        

        return res.send({ user, token: token});
        
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: 'Usuário com credenciais inválidas' });
    }
});

router.post('/new', cache.invalidate(), async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.send({ user });
        
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});


export default router;