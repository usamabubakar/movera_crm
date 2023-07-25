const mongoose = require("mongoose")
const mongooseURI="mongodb://0.0.0.0:27017/transportCRMdb";

const connectDatabase=()=>{
    mongoose.connect(mongooseURI)
    .then(()=>console.log("DataBase connected successfuly...!"))
    .catch((err)=>{console.log(err)});
}

module.exports=connectDatabase;