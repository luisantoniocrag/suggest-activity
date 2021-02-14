const { Router } = require("express");
const user = require('./routes/user.js');
module.exports = () => {
    const app = Router();
    user(app);
    
    return app;
};