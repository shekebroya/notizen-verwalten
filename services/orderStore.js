const Datastore = require('nedb');
const db = new Datastore({ filename: './data/order.db', autoload: true });

function Note(note, titleValue, descriptionValue, importanceValue, finishDateValue)
{
    this.note = note;
    this.titleValue = titleValue;
    this.descriptionValue = descriptionValue;
    this.importanceValue = importanceValue;
    this.finishDateValue = finishDateValue;
    this.createdValue = new Date();
    this.finished = false;
    this.editing = false;
    this.state = "OK";
}


function publicAddNote(note, callback)
{
    let order = new Note(note);
    db.insert(order, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}

function publicRemove(id, callback) {
    db.update({_id: id}, {$set: {"state": "DELETED"}}, {}, function (err, count) {
        publicGet(id, callback);
    });
}
function publicUpdate(id, callback) {
    db.update({_id: id}, {$set: {"edited": "true"}}, {}, function (err, count) {
        publicGet(id, callback);
    });
}

function publicGet(id, callback)
{
    db.findOne({ _id: id }, function (err, doc) {
        callback( err, doc);
    });
}

function publicAll(callback)
{
    db.find({}, function (err, doc) {
        callback( err, doc);
    });
}

module.exports = {add : publicAddNote, delete : publicRemove, get : publicGet, all : publicAll, put: publicUpdate};