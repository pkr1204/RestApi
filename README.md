# REST API

A RESTful API for product management built with Node.js, Express, and MongoDB.

## Features

- GET products with filtering, sorting, and pagination
- Search products by name
- Filter products by company, featured status, etc.

## Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with your MongoDB connection string:
   ```
   MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database
   PORT=5000
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## Deployment to Railway

1. Create a Railway account at [railway.app](https://railway.app)
2. Install the Railway CLI:
   ```
   npm i -g @railway/cli
   ```
3. Login to Railway:
   ```
   railway login
   ```
4. Initialize the project:
   ```
   railway init
   ```
5. Add MongoDB as a service:
   ```
   railway add
   ```
   Select MongoDB from the list.

6. Set up environment variables on Railway dashboard.

7. Deploy your application:
   ```
   railway up
   ```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products?name=iPhone` - Search products by name
- `GET /api/products?company=apple` - Filter products by company
- `GET /api/products?sort=price` - Sort products by price (ascending)
- `GET /api/products?sort=-price` - Sort products by price (descending)
- `GET /api/products?select=name,price` - Select only specific fields
- `GET /api/products?page=2&limit=5` - Pagination

## License

ISC 