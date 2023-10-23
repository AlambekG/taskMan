const cron = require('node-cron');
const Task = require('./database').Task; // Assuming your Task model is defined in database.js

// Scheduled notifications and tasks logic...

cron.schedule('0 9 * * *', async () => {
    const today = new Date();
    const tasksDueToday = await mongoose.Task.find({ deadline: { $gte: today, $lt: new Date(today.getTime() + 86400000) } });

    tasksDueToday.forEach(async (task) => {
        await bot.sendMessage(task.userId, `Reminder: Task "${task.description}" is due today!`);
    });
});

// cron.schedule('0 9 * * *', async () => {
//     const today = new Date();
    
//     // Find upcoming tasks
//     const upcomingTasks = await mongoose.Task.find({ deadline: { $gte: today, $lt: new Date(today.getTime() + 86400000) } });

//     // Find previous tasks that were not completed
//     const previousTasks = await mongoose.Task.find({ deadline: { $lt: today }, completed: false });

//     upcomingTasks.forEach(async (task) => {
//         await bot.sendMessage(task.userId, `Upcoming Task: "${task.description}" is due today!`);
//     });

//     previousTasks.forEach(async (task) => {
//         await bot.sendMessage(task.userId, `Reminder: Task "${task.description}" from earlier is still pending.`);
//     });
// });

module.exports = cron;
