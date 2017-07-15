const Datastore = require('nedb');
const db = new Datastore({ filename: './data/order.db', autoload: true });

function Note(note, titleValue, descriptionValue, importanceValue, finishDateValue)
{
    this.note = note;
    this.titleValue = titleValue;
    this.descriptionValue = descriptionValue;
    this.importanceValue = importanceValue;
    this.finishDateValue = finishDateValue;
    this.createdValue = JSON.stringify(new Date());
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

function publicSort(callback) {
    console.log("publicSort oderstor.js");
    db.find({"finished":true}, function (err, doc) {
        console.log("docs:"+doc);
        callback( err, doc);
    });
}
function publicEdit(id, note, callback) {
    db.update({_id: id}, {$set: {note: {"title": note.title, "description": note.description, "importance": note.importance, "finish": note.finish}}}, {}, function (err, count) {
        publicGet(id, callback);
    });
}
function publicUpdate(id, callback) {
    db.update({_id: id}, {$set: {"finished": true}}, {}, function (err, count) {
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


module.exports = {
    add : publicAddNote,
    sort : publicSort,
    get : publicGet,
    all : publicAll,
    update: publicUpdate,
    edit: publicEdit
};