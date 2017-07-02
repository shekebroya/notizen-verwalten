const mongoose = require('mongoose');

const notizenSchema = mongoose.Schema({
    title:{
        type: String
    },
    description:{
        type: String
    },
    importance:{
        type: Number
    },
    finishDate:{
        type: String
    },
    created:{
        type: Date,
        default:Date.now
    },
    finished:{
        type: Boolean
    },
    editing:{
        type: Boolean
    }
});

const Notiz = module.exports = mongoose.model("Notiz", notizenSchema);


// GET Notiz
module.exports.getNotiz = (callback, limit) => {
    Notiz.find(callback).limit(limit);
}
// Add Genre
module.exports.addNotiz = (notizen, callback) => {
    Genre.create(notizen, callback);
}

// Update Genre
module.exports.updateNotiz = (id, notizen, options, callback) => {
    var query = {_id: id};
    var update = {
        title: notizen.title,
        description: notizen.description,
        importance: notizen.importance,
        finished: notizen.finished
    }
    Notiz.findOneAndUpdate(query, update, options, callback);
}