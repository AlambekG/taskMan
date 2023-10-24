"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.mongoose = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var mongodbUri = process.env.MONGODB_URI;
if (!mongodbUri) {
    throw new Error('MONGODB_URI environment variable is not set');
}
mongoose_1.default.connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var taskSchema = new mongoose_1.default.Schema({
    userId: String,
    description: String,
    deadline: Date,
    completed: Boolean
});
var Task = mongoose_1.default.model('Task', taskSchema);
exports.Task = Task;
var db = mongoose_1.default.connection;
db.on('error', function (err) {
    console.error('MongoDB connection error:', err);
});
db.once('open', function () {
    console.log('Connected to MongoDB');
});
