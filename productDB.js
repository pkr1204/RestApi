require('dotenv').config();
const connectDB = require('./db/connect');
const Product = require('./models/productList');
const ProductJson = require('./product.json');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        // Delete all existing products before inserting new ones
        await Product.deleteMany({});
        await Product.create(ProductJson);
        console.log("Successfully connected to the database");
    }
    catch(error){
        console.log(error);
    }
};
start();
