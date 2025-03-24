require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect');

const PORT = process.env.PORT || 5000;

const product_routes = require('./routes/products');

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("REST API is running");
});

app.use('/api/products', product_routes);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

// Start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
    start();
}

module.exports = { app, start };


