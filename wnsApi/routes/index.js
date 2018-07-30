const router = require('express').Router();

const domainStatus = require('./domainStatus');

router.get('/domainstatus/:domain', domainStatus);

module.exports = router;
