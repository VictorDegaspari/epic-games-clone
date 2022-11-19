import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/post', async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.create(req.body);
        return res.send({ user });
        
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

router.get('/get', async (req, res) => {
    try {
        const users = await User.find();
        return res.send({ users });
        
    } catch (error) {
        return res.status(400).send({ error });
    }
});

export default router;