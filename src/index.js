const express=require('express');
const bodyParser=require('body-parser');
const multer = require('multer')
const { default: mongoose }=require('mongoose');
const route=require('./routes/route.js');

const app=express();

app.use(bodyParser.json());
app.use(multer().any())
app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect("mongodb+srv://project2interngroup4:Group4@cluster0.eo7nhf5.mongodb.net/Project2", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/',route);

app.listen(process.env.PORT || 3001, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3001))
});

