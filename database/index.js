import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './Controller/authController.js';
import gamesRoutes from './Controller/gamesController.js';
import usersRoutes from './Controller/usersController.js';

const app = express();
dotenv.config();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use('/users', usersRoutes);
app.use('/auth', authRoutes );
app.use('/games', gamesRoutes );
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(express.static('/public'));
app.use(express.static('/uploads'));

app.get('/', (req, res) => {
    res.send('OK');
})

app.listen(PORT, () => {
    console.log('Server running at ' + (3000));
});
