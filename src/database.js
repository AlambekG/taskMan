const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const taskSchema = new mongoose.Schema({
    userId: String, // Add more fields as needed
    description: String,
    deadline: Date,
    completed: Boolean
});

const Task = mongoose.model('Task', taskSchema);
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;
module.exports.Task = Task;
