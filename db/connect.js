const mongoose = require('mongoose');

// uri="mongodb+srv://pkr12042003:<Pkr@1204>@creatingapi.drbud.mongodb.net/CreatingApi?retryWrites=true&w=majority&appName=CreatingApi";

const connectDB = (uri) => {
  // console.log("Connecting to the DB");
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
