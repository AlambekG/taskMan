"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
var node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
var bot = new node_telegram_bot_api_1.default(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
var planOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: "Importance/Deadline", callback_data: "1" }]
        ]
    })
};
var start = function () {
    var planMode = false;
    bot.setMyCommands([
        { command: '/start', description: "initialization" },
        { command: '/help', description: 'asking for guidelines' },
        { command: '/plan', description: 'your plans' }
    ]);
    bot.on('message', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
        var chatId, text, match, description, deadline, newTask, importance;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(msg);
                    chatId = msg.chat.id;
                    text = msg.text;
                    if (!(text == '/start')) return [3 /*break*/, 2];
                    return [4 /*yield*/, bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/1.webp')];
                case 1:
                    _b.sent();
                    return [2 /*return*/, bot.sendMessage(chatId, 'Hi there! I am a Task Manager bot created by @koichuaai \nHow can I help you?')];
                case 2:
                    if (!(text == '/help')) return [3 /*break*/, 4];
                    return [4 /*yield*/, bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/540/26f/54026f33-d140-3401-9887-c0cca81f36ed/256/12.webp')];
                case 3:
                    _b.sent();
                    return [2 /*return*/, bot.sendMessage(chatId, 'I can\'t help you')];
                case 4:
                    if (text == '/plan') {
                        return [2 /*return*/, bot.sendMessage(chatId, 'Please enter your task description and deadline (e.g., "Task description - 2023-10-24").')];
                    }
                    if (text && text.includes('plan'))
                        return [2 /*return*/, bot.sendMessage(chatId, 'Thanks for sharing your plan!')];
                    match = text.match(/(.+) - (\d{4}-\d{2}-\d{2})/);
                    if (!match) return [3 /*break*/, 6];
                    description = match[1];
                    deadline = new Date(match[2]);
                    newTask = {
                        userId: (_a = msg.from) === null || _a === void 0 ? void 0 : _a.id,
                        description: description,
                        deadline: deadline,
                        completed: false
                    };
                    // Assuming mongoose is imported and Task model is defined properly
                    // You can then save the new task using Task.create(newTask);
                    return [4 /*yield*/, bot.sendMessage(chatId, 'Task saved!')];
                case 5:
                    // Assuming mongoose is imported and Task model is defined properly
                    // You can then save the new task using Task.create(newTask);
                    _b.sent();
                    _b.label = 6;
                case 6:
                    if (text && text.includes('importance')) {
                        return [2 /*return*/, bot.sendMessage(chatId, 'Please enter the importance level of your task (e.g., "High").')];
                    }
                    if (text) {
                        importance = text;
                        // Here you can save the importance level to the corresponding task in the database
                        return [2 /*return*/, bot.sendMessage(chatId, 'Importance level saved!')];
                    }
                    return [2 /*return*/, bot.sendMessage(chatId, 'I can\'t understand you, please try  \\help  command')];
            }
        });
    }); });
};
exports.start = start;
exports.default = bot;
