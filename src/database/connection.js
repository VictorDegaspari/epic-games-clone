import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://degas:victor123@clusterdev.norgfs8.mongodb.net/?retryWrites=true&w=majority', (err) => {
    if (err) throw err;
});
mongoose.Promise = global.Promise;

export default mongoose;

