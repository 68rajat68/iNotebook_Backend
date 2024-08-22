// const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/Test"

// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI , ()=>{
//         console.log("Connected to Mongo Successfully");
//     })
// }

// module.exports = connectToMongo;


const mongoURI = "mongodb://localhost:27017/inotebook"
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

