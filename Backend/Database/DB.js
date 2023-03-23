const mysql = require('mysql');

class DB{
    constructor(){
        // Create Mysql connection pool
        this.conpool = mysql.createPool({
            connectionLimit: 5,
            host: "10.0.0.88",
            user: "db_spendenanmeldung",
            password: ")kK78y9FG8gQwWYC",
            database: "spendenanmeldung"
        });

        // try to connect
        this.conpool.getConnection((err) => {
            if(err) throw err;
            console.log("Database Connected!");
        });
    }

    // Method for executing a query and returning the result
    executeQuery(query){
        return new Promise((resolve,reject) => {
            this.conpool.query(query,(err,result) => {
                if(err) reject(err);
                else resolve(result);
            });
        });
    }
}

module.exports.DB = DB;