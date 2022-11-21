const internModel=require('../models/internModel')
const collegeModel=require('../models/collegeModel')
const { validEmail, validName, validMobile}=require('../validator/validation')

const createIntern=async function(req,res){
    try{ 
    const {name, email, mobile, collegeName}=req.body
    if(Object.keys(req.body)==0) return res.status(400).send({status:false, message:"No data given for creation"})

    if(!name) return res.status(400).send({status:false, message:"Name is required"})
    if(!validName(name)) return res.status(400).send({status:false, message:"Name can only take alphabets"})
    if(!email) return res.status(400).send({status:false, message:"Email is required"})
    if(!validEmail(email)) return res.status(400).send({status:false, message:"Invalid Email"})
    if(!mobile) return res.status(400).send({status:false, message:"Mobile is required"})
    if(!validMobile(mobile)) return res.status(400).send({status:false, message:"Invalid Mobile"})
    
    const internExist=await internModel.findOne({$or: [{email:email}, {mobile:mobile}]})
    if(internExist) return res.status(400).send({status:false, message:"Email or Mobile already exists"})

    if(!collegeName) return res.status(400).send({status:false, message:"College Name is required"})

    const college=await collegeModel.findOne({$or: [{name:collegeName}, {fullName:collegeName}], isDelete:false }).select({_id:1})
    if(!college) return res.status(400).send({status:false, message:"College does not exist"})
    delete req.body['collegeName']

    req.body.collegeId=college._id

    const internCreated=await internModel.create(req.body)
    return res.status(201).send({status:true, data:internCreated})
}catch(err){
    return res.status(500).send({status:false, message:err.message})
}
}

module.exports.createIntern=createIntern