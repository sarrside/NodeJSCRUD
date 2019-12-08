const express = require('express'),
    mongose = require('mongoose')
const Employe = mongose.model('Employer')

var router = express.Router();
router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Inserer un employé"
    });
})

router.post('/', function(req, res) {
    if (req.body._id == '')
        insertEnregistrement(req, res);
    else
        modifierEnregistrement(req, res);
});

function insertEnregistrement(req, res) {
    var emp = new Employe()
    emp.prenom = req.body.prenom;
    emp.nom = req.body.nom;
    emp.mobile = req.body.mobile;
    emp.city = req.body.city;
    emp.email = req.body.email;
    emp.save((err, doc) => {
        if (!err) {
            res.redirect('/employes/liste')
        } else {
            if (err.name == 'ValidationError') {
                gestionnaireDerreur(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Inserer un employé",
                    employer: req.body
                });
                console.log(req.body)
            } else {
                console.log('Erreur pendant insertion')
            }
        }
    });
}

function modifierEnregistrement(req, res) {
    Employe.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('/employes/liste');
        } else {
            if (err.name = 'ValidationError') {
                gestionnaireDerreur(err, req.body);
                res.render("/employee/addOrEdit", {
                    viewTitle: 'Mise à jour d\'un employer',
                    employer: req.body
                });
                console.log(req.body)
            } else {
                console.log('Erreur de mis à jour')
            }
        }
    })
}



router.get('/modifier/:id', (req, res) => {
    Employe.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('employee/addOrEdit', {
                employer: doc,
                viewTitle: 'Modification d\'un utilisateur'
            });
        } else {
            console.log('Erreur de modification')
        }
    })
})


router.get('/liste', (req, res) => {
    Employe.find((err, docs) => {
        if (!err) {
            res.render("employee/liste", {
                liste: docs
            });

        } else {
            console.log('Erreur pour retrouver la liste des employes')
        }
    })
});

router.get('/suprimmer/:id', (req, res) => {
    Employe.findOneAndRemove(req.params._id, (err, doc) => {
        if (!err) {
            res.redirect('/employes/liste');
        } else {
            console.log('Problème lors de la supression')
        }
    });
})


function gestionnaireDerreur(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'prenom':
                body['prenomError'] = err.errors[field].message;
                break;
            case 'nom':
                body['nomError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            case 'ville':
                body['villeError'] = err.errors[field].message;
                break;
            case 'mobile':
                body['mobileError'] = err.errors[field].message;
                break;
            case 'mobile':
                body['mobileError'] = err.errors[field].message;
                break;
            case 'ville':
                body['villeError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

module.exports = router;