const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app'); 
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri(); 
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri);
  }
}, 30000);

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
}, 30000); 

describe('Books API', () => {
  it('should return all books with status 200', async () => {
    const response = await supertest(app).get('/api/books');
    expect(response.status).toBe(200);
  });

  it('should create a new book and return status 201', async () => {
    const newBook = {
      title: 'New Book',
      author: 'John Doe',
      publishedDate: '2025-03-29',
      genre: 'Fiction',
    };
    const response = await supertest(app).post('/api/books').send(newBook);
    console.log(response.body);  // Log the response body for debugging
    expect(response.status).toBe(201);
  });

  it('should return a book by ID with status 200', async () => {
    const newBook = {
      title: 'New Book',
      author: 'John Doe',
      publishedDate: '2025-03-29',
      genre: 'Fiction',
    };
    const createdBook = await supertest(app).post('/api/books').send(newBook);
    const response = await supertest(app).get(`/api/books/${createdBook.body._id}`);
    expect(response.status).toBe(200);
  });

  it('should update a book and return status 200', async () => {
    const newBook = {
      title: 'New Book',
      author: 'John Doe',
      publishedDate: '2025-03-29',
      genre: 'Fiction',
    };
    const createdBook = await supertest(app).post('/api/books').send(newBook);
    const updatedBook = {
      title: 'Updated Book',
      author: 'Jane Doe',
      publishedDate: '2025-03-30',
      genre: 'Non-Fiction',
    };
    const response = await supertest(app)
      .put(`/api/books/${createdBook.body._id}`)
      .send(updatedBook);
    expect(response.status).toBe(200);
  });

  it('should delete a book and return status 200', async () => {
    const newBook = {
      title: 'New Book',
      author: 'John Doe',
      publishedDate: '2025-03-29',
      genre: 'Fiction',
    };
    const createdBook = await supertest(app).post('/api/books').send(newBook);
    const response = await supertest(app).delete(`/api/books/${createdBook.body._id}`);
    expect(response.status).toBe(200);
  });
});
