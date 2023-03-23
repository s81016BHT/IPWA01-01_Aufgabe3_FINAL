const express = require("express");
const fs = require("fs");
const https = require("https");
const http = require("http");

const { createWebsocketServer } = require("./Websocket/init_websocket");

/* Setting up http SSL Options */

const HTTPS_SSL = {
    key: fs.readFileSync("./SSL/localhost.key"),
    cert: fs.readFileSync("./SSL/localhost.crt")
}

/* Creating the express application and unsing the "Distribution" folder for serving html, js and css */

const app = express()
app.use(express.static('../Distribution'))
app.all("/*", (req, resp, next) => {
    resp.sendFile('index.html', { root: "../Distribution" })
});

/* Initiate Database Connection */

http.createServer((req, res) => {
    res.writeHead(307, { 'Location': 'https://' + req.headers.host + req.url }); // Sending a temporary redirect 307
    res.end();                                                                 // header for redirecting to https
}).listen(80);

/* Creating the Websocket Server based on pre initialized https Server */

createWebsocketServer(
    https.createServer(HTTPS_SSL, app).listen(443, () => { // Creating the HTTPs Server with reference to express
        console.log("HTTPS SERVER IS LISTENING!");
    })
);