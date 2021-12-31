const { buildSchema, GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = require("graphql");
const _ = require("lodash");
// Dummy Data
const books = [
    {name: "Name of the wind", genre: "Fantasy", id: "1", authorId: "1"},
    {name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "3"},
    {name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "2"},
    {name: "The Long Wait", genre: "Romance", id: "4", authorId: "2"},
    {name: "The Awakening", genre: "Sci-Fi", id: "5", authorId: "3"},
    {name: "The Spark", genre: "Horror", id: "6", authorId: "2"},
    {name: "The Cheat Code", genre: "RomCom", id: "7", authorId: "1"}
]
const authors = [
    {name: "Patrick Rufuss", age: 44, id: "1"},
    {name: "Enid Blyton", age: 48, id: "2"},
    {name: "Terry Pratchet", age: 52, id: "3"},
]

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id })
            }
        }
    })
})

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId })
            }
        }
    }),
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: {type: GraphQLID }},
            resolve(parent, args) {
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID }},
            resolve(parent, args) {
                return _.find(authors, {id: args.id});
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
