const { getAllProducts } = require('../controllers/products');
const Product = require('../models/productList');

// Mock the Product model
jest.mock('../models/productList');

describe('Product Controller', () => {
  let mockRequest;
  let mockResponse;
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock request and response objects
    mockRequest = {
      query: {}
    };
    
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });
  
  test('getAllProducts should return all products', async () => {
    const mockProducts = [
      { name: 'iPhone', price: 999, company: 'apple' },
      { name: 'Galaxy', price: 899, company: 'samsung' }
    ];
    
    // Set up the mock chain
    const mockQuery = {
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      // Return the mock products when resolved
      then: jest.fn().mockImplementation(callback => Promise.resolve(callback(mockProducts)))
    };
    
    // Setup Product.find to return our mock query
    Product.find.mockReturnValue(mockQuery);
    
    await getAllProducts(mockRequest, mockResponse);
    
    expect(Product.find).toHaveBeenCalledWith({});
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ 
      Products: mockProducts,
      nbHits: mockProducts.length
    });
  });
  
  test('getAllProducts should filter by company', async () => {
    mockRequest.query.company = 'apple';
    
    const mockProducts = [
      { name: 'iPhone', price: 999, company: 'apple' }
    ];
    
    // Set up the mock chain
    const mockQuery = {
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      // Return the mock products when resolved
      then: jest.fn().mockImplementation(callback => Promise.resolve(callback(mockProducts)))
    };
    
    // Setup Product.find to return our mock query
    Product.find.mockReturnValue(mockQuery);
    
    await getAllProducts(mockRequest, mockResponse);
    
    expect(Product.find).toHaveBeenCalledWith({ company: 'apple' });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ 
      Products: mockProducts,
      nbHits: mockProducts.length
    });
  });
}); 