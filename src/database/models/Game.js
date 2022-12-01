import mongoose from '../../database/connection.js';
const { Schema } = mongoose;

const GameSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true,
    },
    current_price: {
        type: Number,
        require: true,
    },
    old_price: {
        type: Number,
        require: true, // ele serve para obrigar a enviar o campo (dado)
    },
    discount: {
        type: String,
        require: false
    },
    created: {
        type: Date,
        default: Date.now,
    },
});


const Game = mongoose.model('Game', GameSchema);

export default Game;
