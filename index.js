import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import usersRoutes from './src/database/Controller/usersController.js';
import authRoutes from './src/database/Controller/authController.js';
import gamesRoutes from './src/database/Controller/gamesController.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());
app.use('/users', usersRoutes);
app.use('/auth', authRoutes );
app.use('/games', gamesRoutes );
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.send('OK');
})

app.listen(PORT, () => {
    console.log('Server running at 3000');
});
