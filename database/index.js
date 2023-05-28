import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from "http";
import { Server } from 'socket.io';
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
});
const server = createServer(app);

const io = new Server(server, { 
    cors: {
        origin: 'http://localhost:3001',
        methods: ["GET", "POST"],
    } 
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data.room);
        console.log(`User with ID: ${socket.id} joined room: ${data.room}`);

        const message = {
            room: data.room,
            author: null,
            message:  data.username + ' entrou na sala',
            time: (new Date(Date.now()).getHours() - 3) + ":" + new Date(Date.now()).getMinutes(),
        }
        socket.to(data.room).emit("receive_message", message);
    });

    socket.on("exit_room", (data) => {
        console.log('saiu da sala', data.room)
        socket.leave(data.room);
        const message = {
            room: data.room,
            author: null,
            message:  data.username + ' saiu da sala',
            time: (new Date(Date.now()).getHours() - 3) + ":" + new Date(Date.now()).getMinutes(),
        }
        io.to(data.room).emit("receive_message", message);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(PORT, () => {
    console.log('Server running at ' + (3000));
});
