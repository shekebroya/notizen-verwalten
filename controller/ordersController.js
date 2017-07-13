const store = require("../services/orderStore.js");

module.exports.getNotes = function(req, res)
{
    store.all(function (err, orders) {
        res.json(orders || {});
    })
};

module.exports.createNote = function(req, res)
{
    let order = store.add(req.body, function(err, order) {
        res.json(order);
    });
};

module.exports.showOrder = function(req, res){
    store.get(req.params.id, function(err, order) {
        res.json(order);
    });
};

module.exports.deleteOrder =  function (req, res)
{
    store.delete(req.params.id, function(err, order) {
        res.json(order);
    });
};

module.exports.updateNote =  function (req, res)
{
    store.put(req.params.id, function(err, order) {
        res.json(order);
    });
};
module.exports.editNote =  function (req, res)
{
    store.edit(req.params.id, function(err, order) {
        res.json(order);
    });
};
