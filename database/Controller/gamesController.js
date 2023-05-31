import express from 'express';
import fs from 'fs';
import authMiddleware from '../Middlewares/auth.js';
// Na Vercel nao foi possivel realizar upload de imagem
// import uploadMiddleware from '../Middlewares/upload.js';
import Game from '../Models/Game.js';
import Image from '../Models/Image.js';
import cache from 'express-redis-cache';

const router = express.Router();
router.use(authMiddleware);

cache = cache({
    prefix: 'redis-test',
    host: 'redis',
    port: 6379
  });
  
  cache.invalidate = (name) => {
    return (req, res, next) => {
      const route_name = name ? name : req.url;
      if (!cache.connected) {
        next();
        return ;
      }
      cache.del(route_name, (err) => console.log(err));
      next();
    };
  };

router.post('/post', cahe.invalidate(), async (req, res) => {
    const dataValidation = req.body;
    if (
        dataValidation.title.length < 3 ||
        dataValidation.current_price.length < 2 ||
        dataValidation.old_price.length < 2 ||
        dataValidation.url.length < 3 ||
        dataValidation.discount.length < 1
    ) {
        return res.status(400).send({ error: 'Quantidade de caracteres preenchido nos campos insuficiente' });
    }

    try {
        const newImage = new Image({
            name: req.body.title,
            image: {
                data: req.body.url,
                contentType: "image/png"
            }
        });
        const savedImage = await newImage.save();
        const data = Object.assign(req.body, { author: req.userId, image: savedImage._id });

        const game = await Game.create(data);

        return res.send({ game });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

router.get('/search/:title', cahe.route(), async (req, res) => {
    try {
        const regex = new RegExp("^" + req.params.title.toLowerCase(), "i");
        const games = await Game.find({ title: regex });
        return res.send({ games });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

router.get('/get', cahe.route(), async (req, res) => {
    try {
        const games = await Game.find();
        return res.send({ games });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

router.get('/find/:id', cahe.route(), async (req, res) => {
    try {
        const game = await Game.findOne({ _id: req.params.id }).populate('author image');
        const path = 'uploads/' + game.image?.image?.data;
        let base64;

        if (!fs.existsSync(path)) {
            base64 = null;
        } else {
            base64 = fs.readFileSync(path).toString('base64');
        }

        return res.send({ game, path: base64 });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

router.patch('/update/:id', cahe.invalidate(), async (req, res) => {

    try {
        const game = await Game.findOne({ _id: req.params.id }).populate('author image');
        if (game.author?._id != req.userId) return res.status(401).send({ error: 'Nao autorizado' });
        const image = await Image.findOne({ _id: game.image?._id });

        const updateImage = {
            name: req.body.title,
            image: {
                data: req.body.url,
                contentType: "image/png"
            }
        };
        if (image) {
            await image.updateOne(updateImage);
            await game.updateOne(req.body);
        } else {
            const newImage = new Image(updateImage);
            const savedImage = await newImage.save();
            const data = Object.assign(req.body, { author: req.userId, image: savedImage._id });
            await game.updateOne(data);
        }

        const updatedGame = await Game.findOne({ _id: req.params.id }).populate('author image');
        return res.send({ updatedGame });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

router.delete('/remove/:id',cahe.invalidate(), async (req, res) => {
    try {
        const game = await Game.findOne({ _id: req.params.id }).populate('image', '_id');
        if (game.author?._id != req.userId) return res.status(401).send({ error: 'Nao autorizado' });
        const image = await Image.findOne({ _id: game.image?._id });

        await game.delete();
        if (image) await image.delete();
        return res.status(200).send({ success: true, message: "Jogo deletado com sucesso" });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

export default router;