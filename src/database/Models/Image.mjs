import mongoose from '../../database/connection.mjs';
const { Schema } = mongoose;

const ImageSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    image: {
        data: String,
        contentType: String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});


const Image = mongoose.model('Image', ImageSchema);

export default Image;