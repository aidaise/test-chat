const index = require("express");
const expressWebSocket = require("express-ws");
const http = require("http");
const cors = require('cors');

let app = index();
let server = http.createServer(app).listen(3000);
let arr = []
app.use(cors());

expressWebSocket(app, server);

app.get('/messages', function (req, res) {
    console.log(arr);
    res.end(JSON.stringify(arr));
})
app.ws('/web-socket', async function(webSocket) {
    webSocket.on('message', async function(msg) {
        arr.push(JSON.parse(msg))
        webSocket.send(JSON.stringify(arr));
    });
});