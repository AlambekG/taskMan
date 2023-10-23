const TelegramAPI = require('node-telegram-bot-api');
const bot = new TelegramAPI(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

const planOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: "Importance/Deadline", callback_data: "1"}]
        ]
    })
}
const start = () => {
    let planMode = false
    bot.setMyCommands([
        {command: '/start', description: "initialization"}, 
        {command: '/help', description: 'asking for guidelines'},
        {command: '/plan', description: 'your plans'}
    ])
    bot.on('message', async (msg) => {
        console.log(msg)
        const chatId = msg.chat.id;
        const text = msg.text;

        if(text == '/start'){
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/1.webp');
            return bot.sendMessage(chatId, 'Hi there! I am a Task Manager bot created by @koichuaai \nHow can I help you?');
        }
        if(text == '/help'){
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/540/26f/54026f33-d140-3401-9887-c0cca81f36ed/256/12.webp');
            return bot.sendMessage(chatId, 'I can\'t help you');
        }
        if(text == '/plan'){
            return bot.sendMessage(chatId, 'Please enter your task description and deadline (e.g., "Task description - 2023-10-24").');
        }
        
        //bot.sendMessage(chatId, "fuck you")
        // Check if the user's message contains the word "plan"

        if (text.includes('plan')) 
            return bot.sendMessage(chatId, 'Thanks for sharing your plan!');
        
        bot.onText(/(.+) - (\d{4}-\d{2}-\d{2})/, async (msg, match) => {
            const description = match[1];
            const deadline = new Date(match[2]);
            
            const newTask = new mongoose.Task({
                userId: msg.from.id,
                description,
                deadline,
                completed: false
            });
        
            await newTask.save();
            return bot.sendMessage(chatId, 'Task saved!');
        });
        
        // Check if the user's message contains the word "importance"
        if (text.includes('importance')) {
            return bot.sendMessage(chatId, 'Please enter the importance level of your task (e.g., "High").');
        }
        
        // Add an event listener for incoming text messages to capture the importance level
        bot.onText(/(.+)/, async (msg, match) => {
            const importance = match[1];
            
            // Here you can save the importance level to the corresponding task in the database
            
            return bot.sendMessage(chatId, 'Importance level saved!');
        });
        
        
        return bot.sendMessage(chatId, 'I can\'t understand you, please try  \\help  command')
    });
}

module.exports = bot;
module.exports.start = start;
