const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/collegeContoller');
const internController = require('../controllers/internController');

//======================================POST /functionup/colleges=======================================================

router.post('/functionup/colleges', collegeController.createCollege)


//======================================POST /functionup/interns========================================================

router.post('/functionup/interns',internController.createIntern)


//======================================GET /functionup/collegeDetails===================================================

router.get('/functionup/collegeDetails', collegeController.getCollege)




module.exports = router;