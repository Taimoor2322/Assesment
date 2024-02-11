// database.ts
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://taimoorazhar2322:xTMKS8Ibvchy0TSO@codistanassesment.kshxtp8.mongodb.net/?retryWrites=true&w=majority', {
    //   useNewUrlParser: true, // Remove this line
    //   useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
