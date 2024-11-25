const express = require('express')
const app = express()

const {initializeDatabase} = require('./db/db.connect')
const fs = require('fs')
const Books = require('./models/books.model')
const cors = require("cors");

app.use(express.json())


const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

initializeDatabase();

const jsonData = fs.readFileSync('books.json', 'utf-8')
const booksData = JSON.parse(jsonData)

async function seedingData(){
    try{
        for(const book of booksData){
            const newBook = new Books({
                title: book.title,
                author: book.author,
                publishedYear: book.publishedYear,
                genre: book.genre,
                language: book.language,
                country: book.country,
                rating: book.rating,
                summary: book.summary,
                coverImageUrl: book.coverImageUrl
            })
            newBook.save()
        }
    } catch(error){
        console.log("Error seeding the data")
    }
}

// seedingData()

// const newBook = {
//       "title": "To Kill a Mockingbird",
//       "author": "Harper Lee",
//       "publishedYear": 1960,
//       "genre": ["Fiction", "Historical"],
//       "language": "English",
//       "country": "United States",
//       "rating": 8.9,
//       "summary": "A powerful story of racial injustice and moral growth in a small Southern town.",
//       "coverImageUrl": "https://example.com/to_kill_a_mockingbird.jpg"
// }

async function createBook(newBook){
    // console.log("newBook", newBook)
    try{
        const book = new Books(newBook)
        // console.log("book", book)
        book.save()
        return book
        
    } catch(error){
        throw error
    }
}

app.post("/books", async(req, res) => {
    // console.log("response", res)
    try{
        const savedBooks = await createBook(req.body)
        res.status(200).json({messgae: "Movie added successfully", book: savedBooks})
    } catch(error){
        res.status(500).json({error: "Failed to add book"})
    }
})

async function readAllBooks(){
    try{
        const allBooks = await Books.find()
        return allBooks
    } catch(error){
        console.log(error)
    }
}

app.get("/books", async(req, res) => {
    try{
        const books = await readAllBooks()
        if(books.length != 0){
            res.json(books)
        } else {
            res.status(404).json({error: 'No books found'})
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch books."})
    }
})

async function readBookByTitle(bookTitle){
    try{
        const book = await Books.findOne({title: bookTitle})
        return book
    } catch(error) {
        throw(error)
    }
}


app.get("/books/:title", async(req, res) => {
    try{
        const books = await readBookByTitle(req.params.title)
        if(books.length != 0){
            res.json(books)
        } else {
            res.status(404).json({error: "Books not found"})
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch movie"})
    }
})


const readBooksByAuthor = async (authorName) => {
    try{
        const book = await Books.findOne({author: authorName})
        return book
    } catch(error){
        throw(error)
    }
}


app.get("/books/author/:author", async(req, res) => {
    try{
        const books = await readBooksByAuthor(req.params.author)
        if(books.length != 0){
            res.json(books)
        } else {
            res.status(404).json({error: "No movie found"})
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch books"})
    }
})

async function deleteBooks(bookId){
    // console.log("Id", bookId)
    try{
        const deleteBooks = await Books.findByIdAndDelete(bookId)
        // console.log("delete", deleteBooks)
        return deleteBooks
    } catch(error){
        console.log("Error in deleting books", error)
    }
}


app.delete('/books/:bookId', async(req, res) => {
    try{
        const deletedBooks = await deleteBooks(req.params.bookId)
        if(deletedBooks){
            res.status(200).json({message: "Movie deleted successfully."})
        }
    } catch(error){
        res.status(500).json({error: "Failed to delete a movie."})
    }
})

app.listen(3001,() => {
    console.log("Server listening to port 3001")
})