import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
mongoose.connect(`mongodb+srv://${ process.env.CLUSTER_NAME }:${ process.env.CLUSTER_PASSWORD }@clusterdev.norgfs8.mongodb.net/?retryWrites=true&w=majority`, (err) => {
    if (err) throw err;
});
mongoose.Promise = global.Promise;

export default mongoose;

