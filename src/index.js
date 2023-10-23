require('dotenv').config();

bot_token = process.env.TELEGRAM_BOT_TOKEN
const bot = require('./bot');
const db = require('./database');
const cron = require('./reminders');

bot.start();