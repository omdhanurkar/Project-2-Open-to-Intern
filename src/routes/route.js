const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/collegeContoller');
const internController = require('../controllers/internController');

router.post('/functionup/colleges', collegeController.createCollege)

router.post('/functionup/interns',internController.createIntern)

router.get('/functionup/collegeDetails', collegeController.getCollege)







module.exports = router;