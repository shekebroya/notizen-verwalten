const Datastore = require('nedb');
const db = new Datastore({ filename: './data/order.db', autoload: true });

function Order(pizzaName, titleValue, descriptionValue, importanceValue, finishDateValue, finished, editing, day)
{

    this.pizzaName = pizzaName;
    this.titleValue = titleValue;
    this.descriptionValue = descriptionValue;
    this.importanceValue = importanceValue;
    this.finishDateValue = finishDateValue;
    this.createdValue = new Date();
    this.finished = finished;
    this.editing = editing;
    this.day = day;
    this.orderDate = new Date();
    this.state = "OK";
}


function publicAddOrder(pizzaName, callback, titleValue, descriptionValue, importanceValue, finishDateValue, finished, editing, day)
{
    let order = new Order(pizzaName, titleValue, descriptionValue, importanceValue, finishDateValue, finished, editing, day);
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

module.exports = {add : publicAddOrder, delete : publicRemove, get : publicGet, all : publicAll};