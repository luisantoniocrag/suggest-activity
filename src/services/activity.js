const Activity = require('../models/activity');

const ActivityService = {
    async createActivity(input) {
        try {
            const newActivity = await Activity.create({
                ...input,
            });
            return newActivity;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getRandomActivity() {
        try {
            const allActivities = await Activity.find();
            const randomNumber = Math.floor(Math.random() * allActivities.length);
            return allActivities[randomNumber];
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
}

module.exports = ActivityService;