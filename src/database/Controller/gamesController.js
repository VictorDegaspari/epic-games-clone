import express from 'express';
import authMiddleware from '../Middlewares/auth.js';
import Game from '../Models/Game.js';

const router = express.Router();
router.use(authMiddleware);

router.post('/post', async (req, res) => {
    try {
        const game = await Game.create(req.body);
        return res.send({ game });
        
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

router.get('/search/:title', async (req, res) => {
    try {
        const regex = new RegExp("^" + req.params.title.toLowerCase(), "i");
        const games = await Game.find({ title: regex });
        return res.send({ games });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

router.get('/get', async (req, res) => {
    try {
        const games = await Game.find();
        return res.send({ games });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

router.get('/find/:id', async (req, res) => {
    try {
        const game = await Game.findOne({ _id: req.params.id}).populate('author');
        return res.send({ game });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

router.patch('/update/:id', async (req, res) => {
    try {
        const game = await Game.findOne({ _id: req.params.id});
        await game.updateOne(req.body);
        const updatedGame = await Game.findOne({ _id: req.params.id}).populate('author');
        
        return res.send({ updatedGame });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

router.delete('/remove/:id', async (req, res) => {
    try {
        const game = await Game.findOne({ _id: req.params.id}).populate('author');
        if (game.author?._id != req.userId) return res.status(401).send({ error: 'Nao autorizado' });
        
        await game.delete();
        return res.status(200).send({ success: true, message: "Jogo deletado com sucesso" });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

export default router;