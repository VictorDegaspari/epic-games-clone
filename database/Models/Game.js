import mongoose from '../connection.js';
const { Schema } = mongoose;

const GameSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    current_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: false,
    },
    discount: {
        type: String,
        required: false
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },
    url: {
        type: String,
        required: true,
        minlength: 3,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});


const Game = mongoose.model('Game', GameSchema);
let error;
try {
  await Game.save();
} catch (err) {
  error = err;
}
export default Game;
