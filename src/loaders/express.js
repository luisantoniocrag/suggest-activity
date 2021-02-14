const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('../config');
const routes = require('../api');

module.exports = (app) => {
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });
    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');
    app.use(cors());

    // Middleware that transform the raw string into json
    app.use(bodyParser.json());

    // Load api routes
    app.use(config.api.prefix, routes());

    app.use((req, res, next) => {
        const err = new Error('Not found');
        err['status'] = 404;
        next(err); 
    });

    // error handlers
    app.use((err, req, res, next) => {
        /**
         * 401 throw by express-jwt-library
         */
        if (err.name == 'UnauthorizedError') {
            return res
                .status(err.status)
                .send({message: err.message})
                .end();
        }
        return next(err);
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message
            },
        });
    });
};