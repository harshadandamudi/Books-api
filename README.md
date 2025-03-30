# Books API
Building a RESTful API with Node.js

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

git clone https://github.com/harshadandamudi/Books-api.git
cd Books-api

## Install Dependencies
npm install

## Usage instructions
## Run the Application
npm start

## Run Tests
npm test

## POSTMAN collections for Testing
URL: http://localhost:5000/api/books
1. POST /api/books
 {
  "title": "New Book",
  "author": "John Doe",
  "publishedDate": "2025-03-29T00:00:00.000Z",
  "genre": "Fiction"
}

3. GET /api/books
4. GET /api/books/:id
5. PUT /api/books/:id
 {
  "title": "Updated Book",
  "author": "Jane Doe",
  "publishedDate": "2025-03-29T00:00:00.000Z",
  "genre": "Non-Fiction"
}

6. DELETE /api/books/:id 
