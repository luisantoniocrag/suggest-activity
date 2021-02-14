const { Router } = require('express');
const ActivityService = require('../../services/activity')

const route = Router();

module.exports = (app) => {
    app.use('/user', route);

    /**
     * Create a new suggest activity
     * @route POST api/user/activity
    */
    route.post('/activity', 
        async (req, res, next) => {
            try {
                const { title, description, email } = req.body;
                const newActivity = await ActivityService.createActivity({ title, description, email });
                return res.status(201).json(newActivity);
            }
            catch(err) {
                console.error('error: %o', err);
                return next(err);
            }
        },
    );
    
    /**
     * Get a Random tak
     * @route GET api/user/activity
    */
    route.get('/random-activity', 
        async (req, res, next) => {
            try {
                const randomTast = await ActivityService.getRandomActivity();
                return res.status(201).json(randomTast);
            } catch (err) {
                console.error('error: %o', err);
                return next(err);
            }
        },
    );

    /**
     * Get all taks
     * @route GET api/user/activities
     */
    route.get('/activities',
        async(req, res, next) => {
            try {
                const allTaks = await ActivityService.getAllTasks();
                return res.status(201).json(allTaks);
            } catch (err) {
                console.error('error: %o', err);
                return next(err);
            }
        }
    );
};