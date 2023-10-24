import * as dotenv from 'dotenv';
dotenv.config();

const bot_token: string = process.env.TELEGRAM_BOT_TOKEN!;
const bot = require('./bot');
const db = require('./database');
const cron = require('./reminders');

bot.start();
