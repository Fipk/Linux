var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res, next) {
    res.render('../views/index.ejs');
});

app.post('/email', function(req, res, next) {
    var envoyer = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'laos_stich@hotmail.fr',
            pass: 'laosstich857201'
        }
    });
    var Options = {
        from: req.body.sender,
        to: req.body.destination,
        subject: req.body.subject,
        text: req.body.message,
        html: '<b>' + req.body.message + '</b>'
    };
    envoyer.sendMail(Options, function(error, info){
        if(error){
           return console.log(error);
        }
        console.log('Message envoyé: ' + info.response);
    });

    envoyer.close();
});

app.use(function(req, res) {
    res.sendStatus(404);
});

app.listen(8080);