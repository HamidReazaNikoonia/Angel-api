const express = require('express');
const validate = require('express-validation');
const dreamController = require('../../controllers/dream.controller');


const { createDream, updateDream } = require('../../validations/dream.validation');

const router = express.Router();

// Dream Routes

router.get('/:dreamId?', dreamController.get);
router.post('/', validate(createDream), dreamController.create);

// Update
router.put('/:dreamId', validate(updateDream), dreamController.update);

// Delete
router.delete('/:dreamId', dreamController.delete);


module.exports = router;
