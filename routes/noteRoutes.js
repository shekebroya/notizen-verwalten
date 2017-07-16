const express = require('express');
const router = express.Router();
const notizen = require('../controller/notesController.js');

router.get("/", notizen.getNotes);
router.post("/", notizen.createNote);
router.get("/:id/", notizen.showOrder);
router.get("/", notizen.sortNote);
router.put("/:id/", notizen.updateNote);
router.put("/edit/:id/", notizen.editNote);

module.exports = router;