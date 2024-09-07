require('rootpath');
var express = require('express');
const fileUpload = require('express-fileupload');
var app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./middleware/error-handler');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload())



//app.use(cors({origin:(origin, callback) => callback(null, true), credentials:true}));

app.use(cors({ 
    origin: ['http://localhost:4200', 'http://198.71.57.99', 'https://cardlaveritas-rappicard.mx'], // Agrega los sitios permitidos
    credentials: true
}));

app.use('/users', require('./routes/users.routes'));
app.use('/skulls', require('./routes/skulls.routes'));
app.use('/users-skulls', require('./routes/users-skulls.routes'))
//app.use('/skulls', require('./routes/skulls.routes'));

app.get('/', function(req, res){
    res.send('Hello, world');
});


app.use(errorHandler);

app.listen(3000, function(){
    console.log('listening on port 3000');
})