const mongoose = require("mongoose");
require("dotenv").config();
const { DBURI } = process.env;

const connectDB = async () => {
    try {
        await mongoose.connect(DBURI, {});
        console.log("connected to the database")
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;