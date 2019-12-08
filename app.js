require('./models/db')
const express= require('express')
const path= require('path')
const body= require('body-parser')
const exphbs= require('express-handlebars')
const employeController= require('./controlleurs/emplyerControler')
var app = express();
app.use(body.urlencoded({
    extended: true
}));
app.set('views', path.join(__dirname,'/views/'))
app.engine('hbs', exphbs({extname: 'hbs',defaultLayout: 'mainLayout',layoutsDir: __dirname+'/views/layouts/'}))
app.set('view engine', 'hbs')

app.listen(4000,()=> {
    console.log('server started at http://localhost:4000')
});

app.use('/employes',employeController)