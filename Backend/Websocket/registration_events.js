const { DBRegistrationHandler } = require("../Database/DB_RegistrationHandler")

function checkZipCode(zipcode) {
    if (zipcode == 10407) return true
    return false;
}

function registrationEvents(io) {

    /* create DB registration handler */
    let dbhandler = new DBRegistrationHandler();

    /* initialising new socket connection */
    io.on("connection", (socket) => {

        console.log("New Socket connection! " + socket.id);

        /* Socket event to get the available clothing types */
        socket.on("getClothes",() => {
            dbhandler.getAllClothes().then((data) => {
                socket.emit("getClothes",data); // Returns List of all Clothes
            });
        });

        /* Socket event to get the available areas */
        socket.on("getAreas",() => {
            dbhandler.getAllAreas().then((data) => {
                socket.emit("getAreas",data); // Returns list of all Areas
            });
        });

        /* Socket event to validate a specified clothes pick-up address  */
        socket.on("addressValidation",(data) => {
            if (typeof data !== 'object') 
                return;
            if (!data.hasOwnProperty("name") && !data.hasOwnProperty("surname") && !data.hasOwnProperty("street") && !data.hasOwnProperty("number") && !data.hasOwnProperty("zipcode") && !data.hasOwnProperty("location")) 
                return;

            let valid = checkZipCode(data.zipcode);

            socket.emit("addressValidation", {
                addressValid: valid // Returns true if addess is valid, else false!
            });
        });

        /* Socket Event for inserting an new registration */
        socket.on("newRegistration", (data) => {
            if(typeof data !== 'object') socket.emit("registration", null);
            if(!data.hasOwnProperty("type") && !data.hasOwnProperty("address") && !data.hasOwnProperty("clothes") && !data.hasOwnProperty("areas")) socket.emit("registration", null);
            
            dbhandler.storeRegistration(data,socket.id).then((data) => {
                socket.emit("registration", data); // Returns stored object or null value
            });
        });

        /* Socket Event for get an existing registration */
        socket.on("getRegistration",(data) => {
            if (data == "") {
                socket.emit("registration", null);
                return;
            }

            dbhandler.getRegistration(data).then((data) => {
                socket.emit("registration", data); // Returns stored object or null value
            });
        });

    });
    
}

module.exports.registrationEvents = registrationEvents