const app = require('./app')


PORT = 4000;
const http = require('http').Server(app);
http.listen(PORT, (req, res) => {
    console.log(`Server is running http://localhost:${PORT}`)
}) 