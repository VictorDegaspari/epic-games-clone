import express from 'express';
import authMiddleware from '../Middlewares/auth.mjs';
import User from '../Models/User.mjs';

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

router.post('/post', async (req, res) => {
    try {
        if (!req.admin) {
            return res.status(400).send({ error: 'Você precisa ser admin para adicionar usuários' });
        }
        const user = await User.create(req.body);
        return res.send({ user });
        
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

export default router;