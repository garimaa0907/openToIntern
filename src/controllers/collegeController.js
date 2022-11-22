const collegeModel = require('../models/collegeModel');
const {validLogo, nameInLowerCase,  validName}=require('../validator/validation')


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
         if(!nameInLowerCase(name)){
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
module.exports.createCollege = createCollege