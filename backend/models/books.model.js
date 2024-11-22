const mongoose = require('mongoose')

const booksSchema = new mongoose.Schema({
    title: String,
    author: String,
    publishedYear: Number,
    genre: [{
        type: String,
        enum: ['Fiction', 'Historical', 'Romance', 'Thriller', 'Fantasy', 'Non-Fiction', 'Self-help', 'Mystery']
    }],
    language: String,
    country: String,
    rating: Number,
    summary: String,
    coverImageUrl: String
})

const Books = mongoose.model('Books', booksSchema)

module.exports = Books

