const router = require('express').Router();
const { formatHash } = require('../api/decodeData');

router.get('/transinfo/:hash', function (req, res, next) {
    formatHash(req.params.hash);
    res.send('success');
})

module.exports = router;