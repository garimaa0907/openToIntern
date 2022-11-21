const { connections } = require('mongoose');
const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel')
const {validLogo,nameInLowewrCase,validName}=require('../validator/validation')


const createCollege = async function(req,res){
    try{

         const data = req.body

         if(Object.keys(data).length == 0){
            return res.status(400).send({status:false,message:"Please Provide Some Data"})
         }

         

         const { name, fullName, logoLink } = data

          //checking required feild is mandatory
         if(!name){
            return res.status(400).send({status:false,message:"Please provide name"})
         }
         if(!fullName){
            return res.status(400).send({status:false,message:"Please provide fullName"})   
         }
         if(!logoLink){
            return res.status(400).send({status:false,message:"Please Provide logoLink"})
         }
       
         //checking name or fullName in alphabet only
         if(!nameInLowewrCase(name)){
            return res.status(400).send({status:false,message:"Name should be in alphabat type /or/ name should be in LowerCase "})
         }
         if(!validName(fullName)){
            return res.status(400).send({status:false,message:"fullName should be in alphabat type"})
             
         }
          
        //checking logo format

        if(!validLogo(logoLink)){
            return res.status(400).send({status:false,message:"Logolink is not in correct format"})
        }

        // checking fullName present or not
        const findFullName = await collegeModel.findOne({fullName:data.fullName})
        if(findFullName){
            return res.status(400).send({status:false,message:"College fullName is already Registered"})
        }

        // checking name unique

        const findname = await collegeModel.findOne({name:data.name})
        if(findname){
            return res.status(400).send({ status: false, msg: "Name should be unique" });
        }
        else{
           const college = await collegeModel.create(data);
           return res.status(201).send({status:true,data:college})
        }
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}


const getCollegeDetail = async function(req,res){
   try{

       const collegeName = req.query.collegeName

       if(!collegeName){
         return res.status(400).send({status:false,message:"College Name is required in query "})
       }
       if(!validName(collegeName)){
         return res.status(400).send({status:false,message:"College Name should be in alphabat type"})  
       }

       //finding the college
      const findCollege = await collegeModel.findOne({name:collegeName,isDeleted:false}).select({ name: 1, fullName: 1, logoLink: 1 })
      if(!findCollege){
         return res.status(404).send({status:false,message:"College not found"})
      }

      //finding Interns

      const findIntern = await internModel.findOne({collegeId:findCollege._id,isDeleted:false}).select({ name: 1, email: 1, mobile: 1 })
      if(!findIntern){
         return res.status(404).send({status:false,message:"Intern not found"})

      }

      return res.status(200).send({
         status:true,
         data:{
           name:findCollege.name,
           fullName:findCollege.fullName,
           logoLink:findCollege.logoLink ,
           interns:findIntern
         }
      })
   }
   catch(err){
      return res.status(500).send({status:false,message:err.message})
  }
}

module.exports.createCollege = createCollege
module.exports.getCollegeDetail = getCollegeDetail