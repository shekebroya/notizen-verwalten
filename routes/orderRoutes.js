const express = require('express');
const router = express.Router();
const orders = require('../controller/ordersController.js');

router.get("/", orders.getNotes);
router.post("/", orders.createNote);
router.get("/:id/", orders.showOrder);
router.get("/sort/", orders.sortNote);
router.put("/:id/", orders.updateNote);
router.put("/edit/:id/", orders.editNote);

module.exports = router;