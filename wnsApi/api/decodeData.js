const {web3, namehash, wns, contractInstance, deedContract } = require('../method');

function formatHash(hash) {
    console.log(web3.eth.getTransaction(hash));
    console.log(web3.eth.getTransactionReceipt(hash));

}

exports.formatHash = formatHash;