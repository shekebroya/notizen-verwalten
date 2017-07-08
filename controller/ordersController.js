const store = require("../services/orderStore.js");

module.exports.getOrders = function(req, res)
{
    store.all(function (err, orders) {
        res.json(orders || {});
    })
};

module.exports.createPizza = function(req, res)
{
    let order = store.add(req.body.name, function(err, order) {
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
    store.delete(  req.params.id, function(err, order) {
        res.json(order);
    });
};
