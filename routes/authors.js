const express = require('express')
const { route } = require('.')
const router = express.Router() 
const Author = require('../models/author')

//All authors Router
router.get('/', async (req, res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {authors: authors, searchOptions: req.query})
    } catch (err) {
        res.redirect('/')
    }
})

//New Author Route
router.get('/new', (req, res) => {
    res.render('authors/new', {author: new Author()})
})

//Create Author Route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name,
    })
    try {
        const newAuthor = await author.save()
        // res.redirect(`/authors/${newAuthor.id}`)
        return res.redirect('/authors')
    } catch (err) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
    // author.save((err, newAuthor) => {
    //     console.log(newAuthor)
    //     if(err) {
    //         return res.render('/authors/new', {
    //             author: author,
    //             errorMessage: 'Error creating Author'
    //         })
    //     } else {
    //         // res.redirect(`/authors/${newAuthor.id}`)
    //         return res.redirect('/authors')
    //     }
    // })
})

module.exports = router