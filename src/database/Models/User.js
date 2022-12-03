import bcrypt from 'bcrypt';
import mongoose from '../../database/connection.js';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: 3
    },
    admin:{
        type: Boolean,
        required: true,
        default: false
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const User = mongoose.model('User', UserSchema);

export default User;