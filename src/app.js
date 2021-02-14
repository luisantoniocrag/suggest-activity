const express = require('express');
const config = require('./config');

async function startServer() {
    const app = express();
    // loaders like mongoose..
    await require('./loaders')(app);
    app.listen(config.port, () => {
        console.log(`Server running on port: ${config.port}`)
    }).on('error', err => {
        console.error(err);
        process.exit(1);
    });
}

startServer();