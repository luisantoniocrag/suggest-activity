const mongooseLoader = require('./mongoose.js');
const expressLoader = require('./express');

module.exports = async (expressApp) => {
    const mongooseConnection = await mongooseLoader();
    console.log('DB loaded!');
    await expressLoader(expressApp);
    console.log('Express routes loaded!');
}