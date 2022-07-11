const express = require('express')
// making a router
const router = express.Router()
// importing Fruit model to access database
const Fruit = require('../models/fruit')

// POST - Creation
// localhost:3000/comments/:fruitId <- A single Fruit can have many comments
router.post('/:fruitId', (req, res) => {
    const fruitId = req.params.fruitId
    req.body.author = req.body.userId

    Fruit.findById(fruitId)
        // after we found a fruit 
        // take that fruit and add the comment
        .then(fruit => {
            // single fruit doc there is a field called comments
            fruit.comments.push(req.body)

            // if we change a doc, we have to return and call .save() on the doc.
            return fruit.save()
        })
        .then(fruit => {
            res.redirect(`/fruits/${fruit._id}`)
        })
        .catch(err => {
            res.json(err)
        })
})

// DELETE - delete yeeting
// localhost:3000/comments/delete/:fruitId/:commId
router.delete('/delete/:fruitId/:commId', (req, res) => {
    const fruitId = req.params.fruitId
    const commId = req.params.commId

    // find a fruit by it's ID
    Fruit.findById(fruitId) // single fruit doc inside a fruit doc will have many comments
    // find this comment by it's ID
        .then(fruit => {
            const comment = fruit.comments.id(commId)

            // remove comment
            comment.remove()

            // i've changed the comments field by 1
            return fruit.save()
        })
        .then(fruit => {
            res.redirect(`/fruits/${fruitId}`)
        })
        .catch(err => {
            res.send(err)
        })
    
})

module.exports = router