import mongoose, { Connection } from 'mongoose';
import { config } from 'dotenv';
config();

const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) {
  throw new Error('MONGODB_URI environment variable is not set');
}

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as mongoose.ConnectOptions);

const taskSchema = new mongoose.Schema({
  userId: String,
  description: String,
  deadline: Date,
  completed: Boolean
});

interface TaskModel extends mongoose.Model<TaskDocument> {
  // Define static methods or properties here
}

interface TaskDocument extends mongoose.Document {
  userId: string;
  description: string;
  deadline: Date;
  completed: boolean;
}

const Task: TaskModel = mongoose.model<TaskDocument>('Task', taskSchema);
const db: Connection = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

export { mongoose, Task };
