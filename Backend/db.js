const mongoose=require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook"; 
const connectToMong=async ()=>{
await mongoose.connect(mongoURI);
    console.log("connected to mongo successgully");
    

};
module.exports=connectToMong;