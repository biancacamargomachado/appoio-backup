const express = require('express');

const router = express.Router();

// Rota para verificar se a aplicação está funcionando
router.route('/').get((_, res) => {
    res.json({
        status: 'Ok'
    })
});

module.exports = router;