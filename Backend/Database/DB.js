const mysql = require('mysql');

class DB{

    static dbcon_pool = null;

    constructor(){
        // Create Mysql connection pool on static db_con, if not already existing!
        if(DB.dbcon_pool === null){
            DB.dbcon_pool = mysql.createPool({
                host: "10.0.0.88",
                user: "db_spendenanmeldung",
                password: ")kK78y9FG8gQwWYC",
                database: "spendenanmeldung"
            });

            // try to connect by getting a connection
            DB.dbcon_pool.getConnection((err) => {
                if(err) throw err; // throw err if connection failed and interrupt server execution!
                console.log("Database Connected!"); 
            });
        }
    }

    // Method for executing a query and returning the result
    executeQuery(query){
        return new Promise((resolve,reject) => { // Retrun a new promise
            DB.dbcon_pool.query(query,(err,result) => {  // try to execute query
                if(err) reject(err); // on fail reject with err code
                resolve(result); // else resolve successfully with db result
            });
        });
    }
}

module.exports.DB = DB;