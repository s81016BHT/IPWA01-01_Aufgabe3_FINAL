const { Server } = require("socket.io");
const { registrationEvents } = require("./registration_events");

// Function for initialising a Websocket Server based on SocketIo
function createWebsocketServer(https_server){

    // Setup SocketIo Server based on existing https server instance
    const io = new Server(https_server,{
        cors:{
            origin: "*"
        }
    });

    // initialising registration events
    registrationEvents(io)
}

module.exports.createWebsocketServer = createWebsocketServer