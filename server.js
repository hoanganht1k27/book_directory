const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const dbUrl = "mongodb://localhost:27017/mybrary"

mongoose.connect(process.env.DATABASE_URL || dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

const db = mongoose.connection
db.on('error', err => console.log(err))
db.once('open', () => {
    console.log("Connected to Mongodb")
})

app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 3000)