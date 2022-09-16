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

//========================================if pathparams is wrong or empty================================================

router.all('/*',function(req,res){  return res.status(404).send({status:false,message:"endpoint is required"})})



module.exports = router;