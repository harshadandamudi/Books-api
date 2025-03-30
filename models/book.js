const mongoose = require('mongoose')
const Joi = require('joi');

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    publishedDate:{
        type: Date,
        required: true
    },
    genre: {
        type: String,
        required: true
      }
    }, { timestamps: true });

    const validateBook = (book) => {
        const schema = Joi.object({
          title: Joi.string().required(),
          author: Joi.string().required(),
          publishedDate: Joi.date().required(),
          genre: Joi.string().required(),
        });
        return schema.validate(book);
      };
    
    const Book = mongoose.model('Book',bookSchema)
    module.exports = {Book,validateBook};

