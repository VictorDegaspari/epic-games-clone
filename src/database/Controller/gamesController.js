import express from 'express';
import Game from '../models/Game.js';

const router = express.Router();

router.post('/post', async (req, res) => {
    try {
        console.log(req.body)
        const game = await Game.create(req.body);
        return res.send({ game });
        
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

router.get('/find/:name', async (req, res) => {
    try {
        const gameName = req.params.name;
        const games = await Game.find({ title: gameName });
        return res.send({ games });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

export default router;