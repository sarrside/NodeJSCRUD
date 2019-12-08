const mongoose = require('mongoose')
var employeSchema = new mongoose.Schema({
    prenom:{
        type: String,
        required: 'Ce champ est réquis veuiller la remplir'
    },
    nom: {
        type: String,
        required: 'Ce champ est réquis veuiller la remplir'
    },
    email: {
        type:String
    },
    mobile: {
        type: String
    },
    city: {
        type: String,
        required: 'Veuillez indiquer ou vous habitez'
    }
});


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

employeSchema.path('email').validate((val)=>{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
},'email invalide veuillez donner un email valide')

mongoose.model('Employer',employeSchema);