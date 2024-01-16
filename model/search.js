const mongoose = require('mongoose')

const Schema = mongoose.Schema

const searchSchema = new Schema({

    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

})

const Search = mongoose.model("Search", searchSchema)
module.exports = Search