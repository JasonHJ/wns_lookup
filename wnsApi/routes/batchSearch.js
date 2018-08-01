const router = require('express').Router();
const multer  = require('multer');
const path = require('path');
const fs = require('fs');
const uploadFolder = path.join(__dirname,'..', 'uploads');
const { getStatus, checkHash } = require('../api/formatData');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const createFolder = function (folder) {
    try {
        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
        // 如果文件路径不存在将会抛出错误"no such file or directory"
        fs.accessSync(folder);
    } catch (e) {
        // 文件夹不存在，以同步的方式创建文件目录。
        fs.mkdirSync(folder);
    }
};

createFolder(uploadFolder);

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        if (file.mimetype === 'application/json') {
            cb(null, true); //允许
        } else {
            req.err = '失败';
            cb(null, false);
        }
    }
}).single('file');

router.post('/batchsearch', function (req, res, next) {
    upload(req, res, (err) => {
        if(err) {
            res.json(err);
        }
        let fileData = JSON.parse(fs.readFileSync(`${uploadFolder}/${req.file.filename}`));
        if(req.file.originalname === 'checkStatus.json'){
            let status_name = getStatus(fileData, req.file.filename);
            res.json({
                download: `/download/status_${req.file.filename}`,
                data: status_name
            })
        }
        if(req.file.originalname === 'transHash.json') {
            let err_arr = checkHash(fileData);
            console.log(err_arr);
            res.json({err_arr});
        }
    })
});

module.exports = router;
