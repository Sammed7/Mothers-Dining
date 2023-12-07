const express = require('express')
const dotenv = require('dotenv')
const connectDb = require('./config/dbConnection')

// Create instance of express
const app = express()

// Setting up the .env file configs
dotenv.config({ path : './config/.env' })

// Calling connectdb function
connectDb()

const PORT = process.env.PORT || 5000

// Dummy route
app.get('/', (req, res) => {
    res.send({
        message: "First route"
    })
})

// Listen on port
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} In ${process.env.NODE_ENV} mode.`)
});