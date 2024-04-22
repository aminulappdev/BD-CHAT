const mongoose = require('mongoose');
const config = require('./config');

const dbURL = config.db.url;

mongoose.connect(dbURL)
.then(() => {
    console.log('mongose atlas is connected');
})
.catch((error) => {
    console.error(error);
    process.exit(1);
})