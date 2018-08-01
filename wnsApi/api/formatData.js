const path = require('path');
const fs = require('fs');
const {web3, namehash, wns, contractInstance, deedContract } = require('../method');
const outputFolder = path.join(__dirname, '..', 'outputs');

function getStatus(arrName, fieldname) {
    try {
        for (let i = 0; i < arrName.length; i++) {
            let arrInfo = [
                'Name is available and the auction hasn\'t started',
                'Name is available and the auction has been started, the end time of the auction is ' + new Date(contractInstance.entries(web3.sha3(arrName[i]["name"]))[2].toNumber() * 1000),
                'Name is taken and currently owned by someone',
                'Name is forbidden',
                'Name is currently in the \'reveal\' stage of the auction \n' +
                'The current winning bidder is: ' +
                deedContract.at(contractInstance.entries(web3.sha3(arrName[i]["name"]))[1]).owner() +
                '\nthe current winning bid is: ' +
                web3.fromWei(contractInstance.entries(web3.sha3(arrName[i]["name"]))[4]) + ' WAN' +
                '\nthe end time of the auction is ' + new Date(contractInstance.entries(web3.sha3(arrName[i]["name"]))[2].toNumber() * 1000),
                'Name is not yet available due to the \'soft launch\' of names, it will be available for auction after ' + new Date(contractInstance.getAllowedTime(web3.sha3(arrName[i]["name"])) * 1000)
            ];

            let status = contractInstance.entries(web3.sha3(arrName[i]["name"]))[0].toString();
            console.log(arrName[i]["name"], arrInfo[status]);
            arrName[i].status = arrInfo[status];
        }

        console.log("正在写入文件...")
        fs.writeFileSync(`${outputFolder}/status_${fieldname}`, JSON.stringify(arrName, null, 2), "utf8");
        console.log("文件写入完毕!");
        return arrName;
    } catch (err) {
        console.log(err)
    }
}

function checkHash(arrayHash) {
    let err_arr = [];
    arrayHash.forEach((item, index) => {
        if(web3.eth.getTransactionReceipt(item).status !== '0x1') {
            err_arr.push(item);
        }
    })
    return err_arr;
}

exports.getStatus = getStatus;
exports.checkHash = checkHash;
