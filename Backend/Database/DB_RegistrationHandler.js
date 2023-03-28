const { DB } = require("./DB")
const moment = require("moment")

function createRegistrationID(){
    return new Date().getTime();
}

class DBRegistrationHandler extends DB{

    /*-----------------------------------------------------------------------------------
                                Get Data for user selection
    -------------------------------------------------------------------------------------*/

    /* Method to get all Areas from Database */
    getAllAreas(){
        return new Promise((resolve) => {
            let query = "SELECT * FROM Areas;"; // Query for selecting all areas from the database for user selection
            let areaList = [] // initialise empty list for areas

            /* Try to execute the query */
            this.executeQuery(query).then((areas) => {             
                areas.forEach(area => {
                    areaList.push({title: area.AREANAME, active: false}) // add each area to areaList, if not empty!
                });

                resolve(areaList); // resolve with areaList
            }).catch((err) => {
                console.log("Error during execution of getAreas()!");
                resolve(areaList); // resolve with empty areaList on error
            });
        });
    }

    /* Method to get all clothing types from Database */
    getAllClothes(){
        return new Promise((resolve) => {
            let query = "SELECT * FROM Clothes;"; // Query for selecting all clothes from the database for user selection
            let clothesList = [] // initialise empty list for clothes

            /* Try to execute the query */
            this.executeQuery(query).then((clothes) => {
                clothes.forEach(dress => {
                    clothesList.push({title: dress.DRESSNAME, active: false}) // add each clothing type to areaList, if not empty!
                });

                resolve(clothesList); // resolve with clothesList
            }).catch((err) => {
                console.log("Error during execution of getClothes()!");
                resolve(clothesList); // resolve with empty clothesList on error
            });
        });
    }

    /*-----------------------------------------------------------------------------------
                                Search existing registration
    -------------------------------------------------------------------------------------*/

    /* Method to get clothes by registration_id */
    getRegistrationClothes(registration_id){
        return new Promise((resolve) => {
            /* query for getting all clothes by a registration ID from Registrations_Clothes table */
            let query = `SELECT * FROM Registrations_Clothes WHERE registrationID = ${ DB.dbcon_pool.escape(registration_id) };`; 

            /* try to execute the query */
            this.executeQuery(query).then((result) => {
                if (result.length < 1) return resolve(null); // resolve with null if result is empty

                let clothesList = []; // initialise empty array list for registration clothes

                result.forEach((cloth) => {
                    clothesList.push(cloth.name); // add every cloth for a registration ID into the clothesList
                });

                resolve(clothesList); // resolve with the filled clothesList
            }).catch((err) => {
                console.log("Error during execution of getRegistrationClothes()!", err)
                resolve(null); // resolve with null on error
            });
        });
    }

    /* Method to get areas by registration_id */
    getRegistrationAreas(registration_id){
        return new Promise((resolve) => {
            /* query for getting all areas by a registration ID from Registrations_Areas table */
            let query = `SELECT * FROM Registrations_Areas WHERE registrationID = ${ DB.dbcon_pool.escape(registration_id) };`;

            this.executeQuery(query).then((result) => {
                if (result.length < 1) return resolve(null); // resolve with null if result is empty

                let areaList = []; // initialise empty array list for registration areas

                result.forEach((area) => {
                    areaList.push(area.name);  // add every area for a registration ID into the areaList
                });

                resolve(areaList); // resolve with the filled areaList
            }).catch((err) => {
                console.log("Error during execution of getRegistrationAreas()",err)
                resolve(null); // resolve with null on error
            });
        });
    }

    /* Method to get address by registration_id */
    getRegistrationAddress(registration_id){
        return new Promise((resolve) => {
            /* query for get the address for a registration by a registration ID from Registrations_Addresses table */
            let query = `SELECT * FROM Registrations_Addresses WHERE registrationID = ${ DB.dbcon_pool.escape(registration_id) };`;

            /* try to execute the query */
            this.executeQuery(query).then((result) => {
                if (result.length < 1) return resolve(null); // resolve with null if result is empty

                /* create address object with result data */
                let addressobj = {
                    name: result[0].name,
                    surname: result[0].surname,
                    street: result[0].street,
                    number: result[0].number,
                    zipcode: result[0].zipcode,
                    location: result[0].location
                }

                resolve(addressobj); // resolve with address object
            }).catch((err) => {
                console.log("Error during execution of getRegistrationAddress()",err);
                resolve(null); // resolve with null on error
            });
        });
    }

    /* Method to get registration by registration_id */
    getRegistration(registration_id){
        return new Promise((resolve) => {
            /* query to get registration data by registration_id from Registrations table */
            let query = `SELECT * FROM Registrations WHERE registrationID = ${ DB.dbcon_pool.escape(registration_id) };`;

            /* try to execute the query */
            this.executeQuery(query).then(async (result) => {
                if(result.length < 1) return resolve(null); // if result is empty resolve with null and stop execution!

                let dateTime = moment(result[0].timestamp); // get date by stored timestamp

                let address = await this.getRegistrationAddress(registration_id); // try to get the address if exists
                let clothes = await this.getRegistrationClothes(registration_id); // try to get the clothes
                let areas = await this.getRegistrationAreas(registration_id); // try to get the areas
                
                /* create registration object by results */
                let registrationobj = {
                    type: result[0].type,
                    date: dateTime.format("DD.MM.YYYY"),
                    time: dateTime.format("HH:mm:ss"),
                    registrationId: registration_id,
                    clothes: clothes,
                    areas: areas,
                    address: address,
                    state: result[0].state
                };

                resolve(registrationobj); // resolve with registration object
            }).catch((err) => {
                console.log("Error during execution of getRegistration()",err);
                resolve(null); // on error resolve with null
            });
        });
    }

    /*-----------------------------------------------------------------------------------
                                   Registration Storing
    -------------------------------------------------------------------------------------*/

    /* Method to delete a registration by registration_id, if storing phase failed */
    deleteRegistration(registration_id){
        return new Promise((resolve) => {
            /* query for deletion of a registration by registrationID from Registrations table -> cascades deletion in other tables! */
            let query = `DELETE FROM Registrations WHERE registrationID = ${ DB.dbcon_pool.escape(registration_id) };`;

            /* try to execute the query */
            this.executeQuery(query).catch((err) => {
                console.log("Error during execution of deleteRegistration()!");
                return resolve(false); // resolve with false if failed
            });

            return resolve(true); // resolve with true if failed
        });
    }

    /* Method of storing address by registration_id */
    storeAddress(type,address,registration_id){
        return new Promise((resolve) => {
            if(type == "Übergabe an der Geschäftsstelle") return resolve(true); // resolve true if type is not collection
            if(address == null) return resolve(false); // if address is null, resolve with false

            /* query for storing an address in Registrations_Addresses table */
            let query = `INSERT INTO Registrations_Addresses(registrationID,name,surname,street,number,zipcode,location) 
                         VALUES (${DB.dbcon_pool.escape(registration_id)},${DB.dbcon_pool.escape(address.name) },
                                 ${DB.dbcon_pool.escape(address.surname) },${DB.dbcon_pool.escape(address.street) },
                                 ${DB.dbcon_pool.escape(address.number)},${DB.dbcon_pool.escape(address.zipcode)},
                                 ${DB.dbcon_pool.escape(address.location)});`;

            /* try to execute the query */
            this.executeQuery(query).catch((err) => {
                console.log("Error during execution of storeAddress()!",err);
                return resolve(false); // on error resolve with false
            });

            return resolve(true); // else resolve with true
        });
    }

    /* Method of storing selected clothes by registration ID */
    storeClothes(clothes,registration_id){
        return new Promise((resolve) => {
            clothes.forEach(clothing => {
                /* query to store each clothing in Registrations_Clothes table */ 
                let query = `INSERT INTO Registrations_Clothes(registrationID,name) 
                             VAlUES (${DB.dbcon_pool.escape(registration_id)},${DB.dbcon_pool.escape(clothing)})`;

                /* try to execute the query */
                this.executeQuery(query).catch((err) => {
                    console.log("Error during execution of storeClothes()!",err);
                    return resolve(false); // resolve with false on error
                });
            });

            return resolve(true); // else resolve with true on success
        });
    }

    /* Method of storing selected areas by registration ID */
    storeAreas(areas,registration_id){
        return new Promise((resolve) => {
            areas.forEach(area => {
                /* query to store each area in Registrations_Areas table */ 
                let query = `INSERT INTO Registrations_Areas(registrationID,name) 
                             VAlUES (${DB.dbcon_pool.escape(registration_id)},${DB.dbcon_pool.escape(area)})`;

                /* try to execute the query */
                this.executeQuery(query).catch((err) => {
                    console.log("Error during execution of storeAreas()!",err);
                    return resolve(false); // on error resolve with false
                });
            });

            return resolve(true); // else return with true
        });
    }

    /* Method of storing registration type, date and time by registration ID */
    storeRegistration(registration){
        return new Promise((resolve) => {
            if(!Array.isArray(registration.areas)) return resolve(null); // if registration areas is not an array resolve with null
            if(!Array.isArray(registration.clothes)) return resolve(null); // if registration clothes is not an array resolve with null
            if(registration.areas.length < 1) return resolve(null); // if registration areas array is empty resolve with null
            if(registration.clothes.length < 1) return resolve(null); // if registration clothes array is empty resolve with null

            let currentDateTime = moment(); // Get current DateTime by moment.js library
            let registration_id = createRegistrationID(); // generate a new unique registration ID by Date in milliseconds

            /* Query for storing a new registration in Registrations table */
            let query = `INSERT INTO Registrations(registrationID,type,timestamp) 
                         VALUES (${DB.dbcon_pool.escape(registration_id)},${DB.dbcon_pool.escape(registration.type)},
                                 ${DB.dbcon_pool.escape(currentDateTime.format("YYYY-MM-DDTHH:mm:ss"))})`

            registration["date"] = currentDateTime.format("DD.MM.YYYY"); // Store date in registration
            registration["time"] = currentDateTime.format("HH:mm:ss"); // Store time in registration
            registration["registrationId"] = registration_id // Store registration ID in registration
            registration["state"] = "Offen"

            /* try to execute the query */
            this.executeQuery(query).then(async (result) => {
                if(!await this.storeAddress(registration.type,registration.address,registration_id)) 
                    this.deleteRegistration(registration_id).then(resolve(null)); // try to delete inserted registration if address storing failed and resolve with null
                if(!await this.storeClothes(registration.clothes,registration_id)) 
                    this.deleteRegistration(registration_id).then(resolve(null)); // try to delete inserted registration if address storing failed and resolve with null
                if(!await this.storeAreas(registration.areas,registration_id)) 
                    this.deleteRegistration(registration_id).then(resolve(null)); // try to delete inserted registration if address storing failed and resolve with null

                return resolve(registration); // resolve with stored registration on success
            }).catch((err) => {
                console.log("Error during execution of storeRegistration()",err)
                return resolve(null); // on error resolve with null!
            });
        });
    }

}

module.exports.DBRegistrationHandler = DBRegistrationHandler;