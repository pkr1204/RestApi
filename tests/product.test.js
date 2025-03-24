const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../app');
const dbHandler = require('./db-handler');
const Product = require('../models/productList');

// Sample product data for testing
const sampleProducts = [
  {
    name: 'Test iPhone',
    price: 999,
    featured: true,
    rating: 4.8,
    company: 'apple'
  },
  {
    name: 'Test Galaxy',
    price: 899,
    featured: false,
    rating: 4.6,
    company: 'samsung'
  }
];

describe('Product API', () => {
  // Connect to the database before all tests
  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await dbHandler.connect();
  });

  // Clear database between tests
  beforeEach(async () => {
    await dbHandler.clearDatabase();
    // Add sample data for testing
    await Product.create(sampleProducts);
  });

  // Close database connection after all tests
  afterAll(async () => {
    await dbHandler.closeDatabase();
  });

  // Test GET all products endpoint
  describe('GET /api/products', () => {
    test('It should return all products', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(response.body).toHaveProperty('Products');
      expect(response.body.Products.length).toBe(2);
      expect(response.body.nbHits).toBe(2);
    });

    test('It should filter products by company', async () => {
      const response = await request(app)
        .get('/api/products?company=apple')
        .expect(200);

      expect(response.body.Products.length).toBe(1);
      expect(response.body.Products[0].name).toBe('Test iPhone');
    });

    test('It should sort products by price', async () => {
      const response = await request(app)
        .get('/api/products?sort=price')
        .expect(200);

      expect(response.body.Products[0].price).toBeLessThan(response.body.Products[1].price);
    });

    test('It should filter by featured status', async () => {
      const response = await request(app)
        .get('/api/products?featured=true')
        .expect(200);

      expect(response.body.Products.length).toBe(1);
      expect(response.body.Products[0].featured).toBe(true);
    });

    test('It should select only specified fields', async () => {
      const response = await request(app)
        .get('/api/products?select=name,price')
        .expect(200);

      expect(response.body.Products[0]).toHaveProperty('name');
      expect(response.body.Products[0]).toHaveProperty('price');
      expect(response.body.Products[0]).not.toHaveProperty('company');
      expect(response.body.Products[0]).not.toHaveProperty('rating');
    });
  });

  // Test the home route
  describe('GET /', () => {
    test('It should return a welcome message', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.text).toContain('REST API is running');
    });
  });
}); 