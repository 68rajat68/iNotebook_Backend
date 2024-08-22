// const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/Test"

// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI , ()=>{
//         console.log("Connected to Mongo Successfully");
//     })
// }

// module.exports = connectToMongo;


// const mongoURI = "mongodb://localhost:27017/inotebook"
// const mongoURI = process.env.database
// "mongodb+srv://68rajat68:<68rajat68password>@inotebook.w1hhh.mongodb.net/?retryWrites=true&w=majority&appName=iNotebook"
// const mongoURI = "mongodb+srv://68rajat68:<68rajat68password>@cluster0.eh1io.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// const uri = "mongodb+srv://68rajat68:<68rajat68password>@cluster0.eh1io.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const mongoURI = "mongodb+srv://68rajat68:68rajat68password@inotebook.w1hhh.mongodb.net/?retryWrites=true&w=majority&appName=iNotebook";
const mongoURI = process.env.database;

const mongoose = require('mongoose');

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

module.exports = connectToMongo;

