const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../controllers/controllers');

const upload = multer({ dest: 'uploads/' });

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get("/contract-details",controller.getContractDetails);
router.post('/upload', upload.array('files', 5), controller.uploadToIPFS); // Up to 5 files
router.post('/create-case', controller.createCase);
router.get('/cases', controller.getCases);



module.exports = router;
