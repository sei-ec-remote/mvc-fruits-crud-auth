// using an already connected mongoose not a fresh one from node_modules
const mongoose = require('./connection')

// inside of mongoose I want the keys that are named Schema and model
const { Schema, model } = mongoose

const fruitSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
}, {
    timestamps: true
})

// need to make a model
// this collections will be called fruits
const Fruit = model('Fruit', fruitSchema)

module.exports = Fruit