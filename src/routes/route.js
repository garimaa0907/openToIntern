const express=require('express')
const router=express.Router()
const collegeController=require('../controllers/collegeController')
const internController=require('../controllers/internController')

router.all('/*',function(req,res){
    res.status(400).send({message:"invalid http request"})
})

router.post('/functionup/colleges', collegeController.createCollege)

router.post('/functionup/interns', internController.createIntern)

module.exports=router