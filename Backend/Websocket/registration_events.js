const { DBRegistrationHandler } = require("../Database/DB_RegistrationHandler")

/* KeyLists received json must include! */
const addressKeys = ['name', 'surname', 'street', 'number', 'zipcode', 'location'];
const registrationKeys = ['type', 'address', 'clothes', 'areas'];
const registrationSearchKeys = ['registrationID'];

/* function to check zipcode for address validation */
function checkZipCode(zipcode) {
    if (zipcode == 10407) return true
    return false;
}

/* function to check received json */
function checkKeys(object, keylist) {
    if (typeof object !== 'object') return false;
    return keylist.every(key => Object.keys(object).includes(key));
}

/* function that contains all registration events */
function registrationEvents(io) {

    /* create DB registration handler */
    let dbhandler = new DBRegistrationHandler();

    /* initialising new socket connection listener */
    io.on("connection", (socket) => {

        console.log("New Socket connection! " + socket.id);

        /* Socket event to get the available clothing types */
        socket.on("getClothes", () => {
            dbhandler.getAllClothes().then((clothesList) => { // try to get all clothes and await clothesList to be returned
                socket.emit("getClothes", {
                    clothes: clothesList // Returns a list of all clothes to the client
                });
            });
        });

        /* Socket event to get the available areas */
        socket.on("getAreas", () => {
            dbhandler.getAllAreas().then((areaList) => { // try to get all areas and await areaList to be returned
                socket.emit("getAreas", {
                    areas: areaList // Returns a list of all areas to the client
                });
            });
        });

        /* Socket event to validate a specified clothes pick-up address  */
        socket.on("addressValidation", (data) => {
            if(!checkKeys(data, addressKeys)) {
                socket.emit("addressValidation", { addressValid: false }); // check if received data is an object and containing the needed keys
                return;                                                    // if not, return false for addressValid
            }

            socket.emit("addressValidation", {
                addressValid: checkZipCode(data.zipcode) // Returns true if zipcodes matching, else false!
            });
        });

        /* Socket Event for inserting an new registration */
        socket.on("newRegistration", (data) => {
            if(!checkKeys(data, registrationKeys)) {
                socket.emit("registration", { registration: null }); // check if received data is an object and containing the needed keys
                return;                                              // if not, return null for registration
            }

            dbhandler.storeRegistration(data).then((registration) => {
                socket.emit("registration", {
                    registration: registration // Returns stored registration or null value
                });
            });
        });

        /* Socket Event for get an existing registration */
        socket.on("getRegistration", (data) => {
            if(!checkKeys(data, registrationSearchKeys)) {
                socket.emit("registration", { registration: null }); // check if received data is an object and containing the needed keys
                return;                                               // if not, return null for registration
            }

            dbhandler.getRegistration(data).then((registration) => {
                socket.emit("registration", {
                    registration: registration // Returns stored registration if found or null value
                });
            });
        });

    });
}

module.exports.registrationEvents = registrationEvents