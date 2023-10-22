const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: String, // Add more fields as needed
    description: String,
    deadline: Date,
    completed: Boolean
});
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
