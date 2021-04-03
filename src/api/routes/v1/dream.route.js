const express = require('express');
const validate = require('express-validation');
const dreamController = require('../../controllers/dream.controller');


const { createDream } = require('../../validations/notes.validation');

const router = express.Router();

// Dream Routes

router.get('/dream/:dreamId?', dreamController.get);
router.post('/dream', validate(createDream), dreamController.create);

// Update
router.put('/dream/:dreamId', dreamController.update);

// Delete
router.delete('/dream/:dreamId', dreamController.delete);


module.exports = router;
