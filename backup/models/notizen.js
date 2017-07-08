const mongoose = require('mongoose');

const notizenSchema = mongoose.Schema({
    title:{
        type: String
    },
    description:{
        type: String
    },
    importance:{
        type: String
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

const Notizen = module.exports = mongoose.model("Notizen", notizenSchema);


// GET Notizen
module.exports.getNotizen = (callback, limit) => {
    Notizen.find(callback).limit(limit);
}