import { compare } from 'bcrypt';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../Models/User.mjs';

dotenv.config();
const router = express.Router();

router.post('/login', async (req, res) => {
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

router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.send({ user });
        
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});


export default router;