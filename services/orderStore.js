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
function publicUpdate(id, callback, titleValue, descriptionValue, ratingValue, dateValue) {
    console.log("titleValue: "+titleValue);
    console.log("id: "+id);
    console.log("callback: "+callback);

    db.update({_id: id}, {$set: {"finished": true}}, {}, function (err, count) {
        publicGet(id, callback);
    });
}
function publicEdit(id, titleValue, descriptionValue, ratingValue, dateValue, callback) {
    console.log(titleValue);
    alert(titleValue);
    db.update({_id: id}, {$set: {"finished": false, "editing": true}, "note":{ "title": titleValue, "description": descriptionValue, "rating": ratingValue, "date": dateValue}}, {}, function (err, count) {
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

module.exports = {add : publicAddNote, delete : publicRemove, get : publicGet, all : publicAll, put: publicUpdate, edit: publicEdit};