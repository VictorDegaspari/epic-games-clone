import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './src/database/Controller/authController.js';
import gamesRoutes from './src/database/Controller/gamesController.js';
import usersRoutes from './src/database/Controller/usersController.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());
app.use('/users', usersRoutes);
app.use('/auth', authRoutes );
app.use('/games', gamesRoutes );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('/public'));

app.get('/', (req, res) => {
    res.send('OK');
})

app.listen(PORT, () => {
    console.log('Server running at 3000');
});
