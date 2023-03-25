const { Server } = require("socket.io");
const { registrationEvents } = require("./registration_events");

/* Function for creating a Websocket Server based on SocketIo and the https server instance */
function createWebsocketServer(https_server){

    /* Setup SocketIo Server based on existing https server instance */
    const io = new Server(https_server,{
        cors:{
            origin: "*" // Allow all origins (could be changed later to an actual location!)
        }
    });

    /* creating registration events */
    registrationEvents(io)
}

module.exports.createWebsocketServer = createWebsocketServer