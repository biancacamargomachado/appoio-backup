const express = require('express');
const tagController = require('../controllers/TagController');

const router = express.Router();

// Rota para cadastrar uma tag
router.route('/registration').post(tagController.register);


module.exports = router;