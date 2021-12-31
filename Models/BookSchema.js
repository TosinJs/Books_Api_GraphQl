const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    genre: {
        type: String,
        required: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: true
    }
})

const Book = mongoose.model("Book", BookSchema)
module.exports = Book;