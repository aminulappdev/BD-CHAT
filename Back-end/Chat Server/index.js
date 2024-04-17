const express = require('express');
let http = require('http');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
let server = http.createServer(app);
let io = require('socket.io')(server, {
    cors: {
        origin: "*",
    },
});

// Middleware
app.use(express.json());
app.use(cors());

// Socket
io.on("connection",(Socket)=>{
    console.log("Connected");
});

server.listen(port, (req,res)=>{
    console.log(`Server is running http://localhost:${port}`)
});