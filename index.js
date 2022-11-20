import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import usersRoutes from './src/database/Controller/usersController.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/users', usersRoutes);
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('OK');
})

app.listen(3000, () => {
    console.log('Server running at 3000');
});
