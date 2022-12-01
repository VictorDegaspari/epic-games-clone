import express, { response } from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.find({email: req.body.email, password: req.body.password});
        if (!user) {
            return res.status(400).send("usario não encontrado");
        }
        return res.send({ user });
        
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});



export default router;