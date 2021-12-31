const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./db");
const schema = require("./Schema/BookSchema")

const app = express();
connectDB()

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))