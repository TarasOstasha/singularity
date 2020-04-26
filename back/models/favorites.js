let mongoose = require('mongoose');

let Favorites = mongoose.model('Favorites', {
    idUser: String,
    favorites: Array
})



module.exports = Favorites;