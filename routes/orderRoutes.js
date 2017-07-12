const express = require('express');
const router = express.Router();
const orders = require('../controller/ordersController.js');

router.get("/", orders.getNotes);
router.post("/", orders.createNote);
router.get("/:id/", orders.showOrder);
router.delete("/:id/", orders.deleteOrder);
router.put("/:id/", orders.updateNote);

module.exports = router;