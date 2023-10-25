import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const DBConnection = async () => {
    const MONGODB_URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-ydrndrn-shard-00-00.zcma8ht.mongodb.net:27017,ac-ydrndrn-shard-00-01.zcma8ht.mongodb.net:27017,ac-ydrndrn-shard-00-02.zcma8ht.mongodb.net:27017/?ssl=true&replicaSet=atlas-bf5uxm-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
        console.log('Database connected');
    } catch (error) {
        console.error('Error while connecting to database ', error.message);
    }
}

export default DBConnection;