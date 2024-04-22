require('dotenv').config();

const dev = {
    app: {
        port : process.env.PORT || 4000,
    } ,

    db : {
        url: process.env.DB_URL || "mongodb://localhost:27017/chat-app"
        // url: "mongodb://localhost:27017/chat-app"
    }
}

module.exports = dev;