const router = require('express').Router();
const path = require('path');

const domainStatus = require('./domainStatus');
const batchSearch = require('./batchSearch');

router.get('/download/*.json', function (req, res) {
    console.log(req.params['0'],111)
    console.log(path.join(__dirname, '..', 'outputs/', req.params['0']))
    res.download(path.join(__dirname, '..', 'outputs/', `${req.params['0']}.json`));
});

router.get('/domainstatus/:domain', domainStatus);
router.post('/batchsearch', batchSearch);

module.exports = router;
