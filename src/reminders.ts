import cron from 'node-cron';
import { Task } from './database'; // Assuming your Task model is defined in database.ts
import bot from './bot'; // Assuming bot.ts is in the same directory


// Scheduled notifications and tasks logic...

cron.schedule('0 9 * * *', async () => {
    const today = new Date();
    const tasksDueToday = await Task.find({ deadline: { $gte: today, $lt: new Date(today.getTime() + 86400000) } });

    tasksDueToday.forEach(async (task) => {
        await bot.sendMessage(task.userId, `Reminder: Task "${task.description}" is due today!`);
    });
});

export default cron;
