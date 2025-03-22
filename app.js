require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect');

const PORT = process.env.PORT || 5000;

const product_routes = require('./routes/products');

app.get('/', (req, res) => {
    res.send("Live Now");
});

app.use('/api/products', product_routes);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`${PORT} Yes I am connected`);
        });
        app.use('/api/products', product_routes);
    } catch (error) {
        console.log(error);
    }
};

start();


