# Product Management REST API

A robust REST API built with Node.js, Express, and MongoDB that provides comprehensive product management functionality. The API supports advanced querying capabilities including filtering, sorting, and field selection.

## Features

- **Product Listing**: Get all products with pagination support
- **Advanced Filtering**: Filter products by:
  - Company (apple, samsung, dell, mi, oneplus)
  - Featured status
  - Custom search by name
- **Sorting**: Sort products by any field (e.g., price, name)
- **Field Selection**: Select specific fields to be returned in the response
- **Pagination**: Control the number of results per page
- **Comprehensive Testing**: Includes unit and integration tests

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Jest (Testing)
- Supertest (API Testing)
- MongoDB Memory Server (Testing)

## API Endpoints

### GET /api/products
Get all products with optional query parameters:

```
# Get all products
GET /api/products

# Filter by company
GET /api/products?company=apple

# Filter featured products
GET /api/products?featured=true

# Sort by price (ascending)
GET /api/products?sort=price

# Sort by price (descending)
GET /api/products?sort=-price

# Select specific fields
GET /api/products?select=name,price

# Pagination
GET /api/products?page=1&limit=10
```


   ```

## Testing

The project includes both unit and integration tests using Jest and Supertest.

### Test Coverage
- Integration tests for all API endpoints
- Unit tests for controllers
- In-memory MongoDB database for testing
- Mocked database queries
- API response validation

## Project Structure

```
├── app.js              # Application entry point
├── controllers/        # Route controllers
├── models/            # Database models
├── routes/            # API routes
├── tests/             # Test files
│   ├── controllers.test.js
│   ├── product.test.js
│   └── db-handler.js
└── .env               # Environment variables
```

## Development

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC
