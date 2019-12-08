const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017 /CrudMongo',{useNewUrlParser: true},(err)=>{
    if(!err){
        console.log('MongoDB connexion successed')
    }else{
        console.log('error connexion')
    }
});
require('./employee.model');