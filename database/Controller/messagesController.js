import amqp from 'amqplib';
import dotenv from 'dotenv';
import express from 'express';
// import authMiddleware from '../Middlewares/auth.js';

const QUEUE_NAME = 'SUPIMPA';
dotenv.config();
const router = express.Router();
// router.use(authMiddleware);

router.post('/producer', async (req, res) => {
    try {
        const conn = await amqp.connect('amqp://rabbitmq'),
        channel = await conn.createChannel();

        channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(req.body)));
        setTimeout(() => {
            conn.close();
        }, 1000);

        return res.send('Message sent');
    } catch (error) {
        console.error(error)
    }
});

export default router;