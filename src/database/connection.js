import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/epic-games', (err) => {
    if (err) throw err;
});
mongoose.Promise = global.Promise;

export default mongoose;

