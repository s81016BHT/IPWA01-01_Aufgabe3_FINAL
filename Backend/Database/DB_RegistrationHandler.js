const { DB } = require("./DB")
const moment = require("moment")

class DBRegistrationHandler extends DB{

    /* Method to get all Areas from Database */
    getAllAreas(){
        return new Promise((resolve) => {
            let query = "SELECT * FROM Areas;";

            this.executeQuery(query).then((areas) => {
                let areaList = []            
                areas.forEach(area => {
                    areaList.push({title: area.name, active: false})
                });
                resolve(areaList);
            }).catch((err) => {
                console.log("Error during execution of getAreas()!");
                resolve(null);
            });
        });
    }

    /* Method to get all clothing types from Database */
    getAllClothes(){
        let query = "SELECT * FROM Clothes;";

        return new Promise((resolve) => {
            this.executeQuery(query).then((clothes) => {
                let clothesList = []
                clothes.forEach(cloth => {
                    clothesList.push({title: cloth.name, active: false})
                });
                resolve(clothesList);
            }).catch((err) => {
                console.log("Error during execution of getClothes()!");
                resolve(null);
            });
        });
    }

    /* Method to get clothes by registration_id */
    getRegistrationClothes(registration_id){
        return new Promise((resolve) => {
            let query = `SELECT * FROM Registrations_Clothes WHERE registrationID = ${ this.conpool.escape(registration_id) };`;

            this.executeQuery(query).then((result) => {
                if(result.length < 1) resolve(null);

                let clothArray = [];

                result.forEach((cloth) => {
                    clothArray.push(cloth.name);
                });

                resolve(clothArray);
            }).catch((err) => {
                console.log("Error while getting clothes",err)
                resolve(null);
            });
        });
    }

    /* Method to get areas by registration_id */
    getRegistrationAreas(registration_id){
        return new Promise((resolve) => {
            let query = `SELECT * FROM Registrations_Areas WHERE registrationID = ${ this.conpool.escape(registration_id) };`;

            this.executeQuery(query).then((result) => {
                if(result.length < 1) resolve(null);

                let areaArray = [];

                result.forEach((area) => {
                    areaArray.push(area.name);
                });

                resolve(areaArray);
            }).catch((err) => {
                console.log("Error while getting areas",err)
                resolve(null);
            });
        });
    }

    /* Method to get address by registration_id */
    getRegistrationAddress(registration_id){
        return new Promise((resolve) => {
            let query = `SELECT * FROM Addresses WHERE registrationID = ${ this.conpool.escape(registration_id) };`;

            this.executeQuery(query).then((result) => {
                if(result.length < 1) resolve(null);

                let addressobj = {
                    name: result[0].name,
                    surname: result[0].surname,
                    street: result[0].street,
                    number: result[0].number,
                    zipcode: result[0].zipcode,
                    location: result[0].location
                }

                resolve(addressobj);
            }).catch((err) => {
                console.log("Error while getting address");
                resolve(null);
            });
        });
    }

    /* Method to get registration by registration_id */
    getRegistration(registration_id){
        return new Promise((resolve) => {
            let query = `SELECT * FROM Registrations WHERE registrationID = ${ this.conpool.escape(registration_id) };`;

            this.executeQuery(query).then(async (result) => {
                if (result.length < 1) {
                    resolve(null);
                    return;
                }

                let address = null;
                let clothes = null;
                let areas = null
                let registrationobj = {};

                let dateTime = moment(result[0].timestamp);

                registrationobj["type"] = result[0].type;
                registrationobj["date"] = dateTime.format("DD.MM.YYYY");
                registrationobj["time"] = dateTime.format("HH:mm:ss")
                registrationobj["registrationId"] = registration_id

                clothes = await this.getRegistrationClothes(registration_id);
                areas = await this.getRegistrationAreas(registration_id);

                if(result[0].type == "Abholung") address = await this.getRegistrationAddress(registration_id);
                    
                registrationobj["clothes"] = clothes;
                registrationobj["areas"] = areas;
                registrationobj["address"] = address;

                resolve(registrationobj);
                
            }).catch((err) => {
                console.log("Error while getting registration!",err);
                resolve(null);
            });
        });
    }

    /* Method of storing addres by registration_id */
    storeAddress(address,registration_id){
        return new Promise((resolve) => {
            let query = `INSERT INTO Addresses(registrationID,name,surname,street,number,zipcode,location) 
                         VALUES (${this.conpool.escape(registration_id)},${this.conpool.escape(address.name) },${ this.conpool.escape(address.surname) },${ this.conpool.escape(address.street) },${this.conpool.escape(address.number)},${this.conpool.escape(address.zipcode)},${this.conpool.escape(address.location)});`

            this.executeQuery(query).then((result) => {
                resolve(result.insertId)
            }).catch((err) => {
                console.log("Error during execution of storeAddress()!",err);
                resolve(null);
            });
        });
    }

    /* Method of storing selected clothes by registration ID */
    storeClothes(clothes,registration_id){
        return new Promise((resolve) => {
            clothes.forEach(cloth => {
                let query = `INSERT INTO Registrations_Clothes(registrationID,name) VAlUES (${this.conpool.escape(registration_id)},${this.conpool.escape(cloth)})`

                this.executeQuery(query).catch((err) => {
                    console.log("Error during execution of storeClothes()!",err);
                    resolve(null)
                });
            });
            resolve();
        });
    }

    /* Method of storing selected areas by registration ID */
    storeAreas(areas,registration_id){
        return new Promise((resolve) => {
            areas.forEach(area => {
                let query = `INSERT INTO Registrations_Areas(registrationID,name) VAlUES (${this.conpool.escape(registration_id)},${this.conpool.escape(area)})`

                this.executeQuery(query).catch((err) => {
                    console.log("Error during execution of storeAreas()!",err);
                    resolve(null)
                });
            });
            resolve();
        });
    }

    /* Method of storing registration type, date and time by registration ID */
    storeRegistration(registration, registration_id){
        return new Promise((resolve) => {
            let currentDateTime = moment();

            let query = `INSERT INTO Registrations(registrationID,type,timestamp) VALUES (${this.conpool.escape(registration_id)},${this.conpool.escape(registration.type)},'${currentDateTime.format("YYYY-MM-DDTHH:mm:ss")}')`

            registration["date"] = currentDateTime.format("DD.MM.YYYY");
            registration["time"] = currentDateTime.format("HH:mm:ss");
            registration["registrationId"] = registration_id

            this.executeQuery(query).then(async (result) => {
                if(registration.address != null)
                    if(await this.storeAddress(registration.address,registration_id) == null) resolve(null)

                if(await this.storeClothes(registration.clothes,registration_id) == null) resolve(null);
                if(await this.storeAreas(registration.areas,registration_id) == null) resolve(null)

                resolve(registration);
            }).catch((err) => {
                console.log("Error while storring Registration!",err)
                resolve(null);
            });
        });
    }
}

module.exports.DBRegistrationHandler = DBRegistrationHandler;