const express= require('express');
const logger = require('morgan');
const movies= require('./routes/movies');
const users=require('./routes/users');
const bodyParser= require('body-parser');
const mongoose= require('./config/database');
var jwt=require('jsonwebtoken');
const app= express();

app.set('secretKey', 'nodeRestApi');//jwt secret token
//connection to mongodb
mongoose.connection.on('error',console.error.bind(console,'MongoDB connection error!!'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req,res){
    res.json({"assignment": "Design a REST API"});
});
//public route
app.use('/users',users);
//private route
app.use('/movies',validateUser,movies);
app.get('/favicon.ico',function(req,res){
    res.sendStatus(204);
});
function validateUser(req,res,next){
    jwt.verify(req.headers['x-access-token'],
    req.app.get('secretKey'),function(err,decoded){
        if(err){
            res.json({
                status:'error',
                message: err.message,
                data: null
            });
        }
        else{
            req.body.userId=decoded.id;
            next();
        }
    });
}
//handle 404  error
app.use(function(req,res, next){
    let err=new Error('Not Found');
    err.status=404;
    next(err);
});
app.use(function(err,req,res,next){
    console.log(err);
    if(err.status===404){
        res.status(404).json({message: "Not Found"});

    }
    else{
        res.status(500).json({message: "Something seems to be wrong :(  !!!"});
    }
});
app.listen(4000,function(){
    console.log('Server is listening on port 4000');
});