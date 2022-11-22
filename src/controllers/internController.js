const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");
const { isValid, validEmail, validName, validMobile, } = require("../validator/validation");

const createIntern = async function (req, res) {
  try {
    const data=req.body
    const { name, email, mobile, collegeName } = data;
    if (Object.keys(data).length == 0)
      return res.status(400).send({ status: false, message: "No data given for creation" });

    if (!name)
      return res.status(400).send({ status: false, message: "Name is required" });
    if (!isValid(name))
      return res.status(400).send({ status: false, message: "Name can't be empty" })
    if (!validName(name))
      return res.status(400).send({ status: false, message: "Name can only take alphabets" });
    if (!email)
      return res.status(400).send({ status: false, message: "Email is required" });
    if (!isValid(email))
      return res.status(400).send({ status: false, message: "Email can't be empty" })
    if (!validEmail(email))
      return res.status(400).send({ status: false, message: "Invalid Email" });
    if (!mobile)
      return res.status(400).send({ status: false, message: "Mobile is required" });
    if (!isValid(mobile))
      return res.status(400).send({ status: false, message: "Mobile can't be empty" })
    if (!validMobile(mobile))
      return res.status(400).send({ status: false, message: "Invalid Mobile" });

    const internExist = await internModel.findOne({
      $or: [{ email: email }, { mobile: mobile }],
    });
    if (internExist)
      return res.status(400).send({ status: false, message: "Email or Mobile already exists" });

    if (!collegeName)
      return res.status(400).send({ status: false, message: "College Name is required" });
    if (!isValid(collegeName))
      return res.status(400).send({ status: false, message: "College Name can't be empty" })
    
    const college = await collegeModel.findOne({ $or: [{ name: collegeName }, { fullName: collegeName }], isDeleted: false, }).select({ _id: 1 });
    if (!college)
      return res.status(400).send({ status: false, message: "College does not exist" });
         //delete req.body["collegeName"];
    data.collegeId = college._id;

    const internCreated = await internModel.create(data);
    return res.status(201).send({ status: true, data: internCreated });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.createIntern = createIntern;     

