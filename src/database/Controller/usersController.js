import express from 'express';
import authMiddleware from '../Middlewares/auth.js';
import User from '../Models/User.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/find/:email', async (req, res) => {
    try {
        const user = await User.find({ email: req.params.email });

        return res.send({ user });
        
    } catch (error) {
        return res.status(400).send({ error });
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