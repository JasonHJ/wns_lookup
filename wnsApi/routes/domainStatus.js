const router = require('express').Router();
const {web3, namehash, wns, contractInstance, deedContract } = require('../method');

router.get('/domainstatus/:domain', function (req, res, next) {

  let domain = req.params.domain;

  if (domain.length < 6) {
    res.json({
      name: domain,
      status: 6,
      message: 'The domain name must be longer than or equal to 6 characters!'
    });
    return;
  }

  try {
    let status = contractInstance.entries(web3.sha3(domain))[0].toString();

    if (status === '0') {
      res.json({
        name: domain,
        status: 0,
      })
    }
    if (status === '1') {
      res.json({
        name: domain,
        status: 1,
        endTime: contractInstance.entries(web3.sha3(domain))[2].toNumber() * 1000
      })
    }
    if (status === '2') {
      res.json({
        name: domain,
        status: 2,
        endTime: contractInstance.entries(web3.sha3(domain))[2].toNumber() * 1000,
        owner: wns.owner(namehash(`${domain}.wan`))
      })
    }
    if (status === '3') {
      res.json({
        name: domain,
        status: 3,
      })
    }
    if (status === '4') {
      res.json({
        name: domain,
        status: 4,
        endTime: contractInstance.entries(web3.sha3(domain))[2].toNumber() * 1000,
        curWinner: deedContract.at(contractInstance.entries(web3.sha3(domain))[1]).owner(),
        curBid: web3.fromWei(contractInstance.entries(web3.sha3(domain))[4])
      })
    }
    if (status === '5') {
      res.json({
        name: domain,
        status: 5,
        endTime: contractInstance.entries(web3.sha3(domain))[2].toNumber() * 1000
      })
    }
  } catch (error) {
    res.json({
      name: domain,
      status: 6,
      message: error
    })
  }
});

module.exports = router;
