import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        console.log('Already connceted')
        return;
    }

    const db = await mongoose.connect(process.env.MONGO_URI, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, err => {
      if(err) throw err;
      console.log('Connected to mongoDB.')
    });

    connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;