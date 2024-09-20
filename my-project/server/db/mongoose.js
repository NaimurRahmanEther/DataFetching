

const mongoose = require("mongoose");





const mongoDB = () => {
     mongoose.connect("mongodb://localhost:27017",{
        dbName:"my-project"
     })
    .then((e) => {
        console.log("Database is running on localhost");
    })
    .catch((err) => {
        console.log(err);
    });
};

module.exports = mongoDB;