var express = require('express');
var app = express();

var port=8700

var menu = [
    {link:'/',page:'Home'},
    {link:'/hotel',page:'Hotel'},
    {link:'/city',page:'City'}
]

var hotelRouter = require('./src/routes/hotelRoutes')(menu);
var cityRouter =  require('./src/routes/cityRoutes')(menu);

//static files
app.use(express.static(__dirname+'/public'));
//html files
app.set('views','./src/views');
//view engine
app.set('view engine','ejs');

app.get('/',function(req,res){
    // res.send("Hi From express")
    res.render('index',{title:'Home',menu})
});


app.use('/hotel',hotelRouter);
app.use('/city',cityRouter);


app.listen(port,function(err){
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
});