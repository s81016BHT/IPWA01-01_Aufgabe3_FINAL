const mysql = require('mysql');

class DB{

    static db_con = null;

    constructor(){
        // Create Mysql connection pool on static db_con, if not already existing!
        if(DB.db_con === null){
            DB.db_con = mysql.createPool({
                host: "10.0.0.88",
                user: "db_spendenanmeldung",
                password: ")kK78y9FG8gQwWYC",
                database: "spendenanmeldung"
            });

            // try to connect by getting a connection
            DB.db_con.getConnection((err) => {
                if(err) throw err; // throw err if connection failed and interrupt server execution!
                console.log("Database Connected!"); 
            });
        }
    }

    // Method for executing a query and returning the result
    executeQuery(query){
        return new Promise((resolve,reject) => { // Retrun a new promise
            DB.db_con.query(query,(err,result) => {  // try to execute query
                if(err) reject(err); // on fail reject with err code
                resolve(result); // else resolve successfully with db result
            });
        });
    }
}

module.exports.DB = DB;