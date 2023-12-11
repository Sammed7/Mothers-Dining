const express = require('express')
const dotenv = require('dotenv')
const connectDb = require('./config/dbConnection')

// Create instance of express
const app = express()
const PORT = process.env.PORT || 5000

// Setting up the .env file configs
dotenv.config({ path : './config/.env' })

// Calling connectdb function
connectDb()

app.use(express.json())

// Dummy route
app.use('/api', require('./routes/userRoutes'))

// Listen on port
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} In ${process.env.NODE_ENV} mode.`)
});