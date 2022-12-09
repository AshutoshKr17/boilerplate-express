const bodyParser = require('body-parser');
let express = require('express');
const res = require('express/lib/response');
let app = express();
require('dotenv').config();

absolutePath =__dirname + '/views/index.html';

// app.get('/',function(req,res){
//     res.send("Hello Express");
// });

app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

function logIp(req,res,next){
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    next();
}
app.use(logIp);


app.get('/now',function(req,res,next){
    req.time = new Date().toString();
    next();
},function(req,res){
    res.json({"time":req.time});
});

app.get('/:word/echo',(req,res)=>{
    var word  = req.params.word;
    // console.log(word);
        res.json({"echo":word});
})
app.post('/name',(req,res)=>{
    var string = req.body.first+" "+req.body.last;
    res.json({name:string});
});

app.get('/name',(req,res)=>{
    var string = req.query.first+" "+req.query.last;
    res.json({"name" : string});
});

app.get('/', (req,res) =>{
    res.sendFile(absolutePath);
});


app.get("/json",(req,res)=>{
    if(process.env.MESSAGE_STYLE === 'uppercase'){
        res.json({"message":  "Hello json".toUpperCase()});
    }
    else{
        res.json({"message": "Hello json"});
    }
});

app.use("/public",express.static(__dirname +"/public"));


console.log("Hello World");



















 module.exports = app;
