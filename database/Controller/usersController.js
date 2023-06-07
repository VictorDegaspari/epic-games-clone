import express from 'express';
import RedisCache from 'express-redis-cache';
import authMiddleware from '../Middlewares/auth.js';
import User from '../Models/User.js';

const router = express.Router();
router.use(authMiddleware);

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

router.get('/find/:email', cache.route(), async (req, res) => {
    try {
        console.log("Buscando no banco...");
        const user = await User.find({ email: req.params.email });

        return res.send({ user });
        
    } catch (error) {
        return res.status(400).send({ error });
    }
});

router.get('/get', cache.route(), async (req, res) => {
    try {
        const users = await User.find();
        return res.send({ users });
        
    } catch (error) {
        return res.status(400).send({ error });
    }
});

router.post('/post', cache.invalidate(), async (req, res) => {
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