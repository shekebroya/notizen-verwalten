const store = require("../services/noteStore.js");

module.exports.getNotes = function(req, res)
{
    store.all(function (err, notizen) {
        res.json(notizen || {});
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

module.exports.sortNote =  function (req, res)
{
    console.log("req.body: "+req.body);
    store.sort(req.body, function(err, order) {
        console.log(req.body);
        res.json(order);
    });
};

module.exports.updateNote =  function (req, res)
{
    store.update(req.params.id, function(err, order) {
        res.json(order);
    });
};
module.exports.editNote =  function (req, res)
{
    store.edit(req.params.id, req.body, function(err, order) {
        res.json(order);
    });
};
