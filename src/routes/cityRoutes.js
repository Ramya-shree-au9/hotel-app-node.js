var express = require('express')
var cityRouter = express.Router();
var db = require('mongodb').MongoClient
// var url = "mongodb://localhost:27017"
var url ='mongodb+srv://Ramya_21:mongo@123@cluster0.wqnkn.mongodb.net/attainu?retryWrites=true&w=majority'


function router(menu){
//http://localhost:8700/city
cityRouter.route('/')
    .get(function(req,res){
        // res.send('city')
        db.connect(url,(err,connection)=>{
          if(err){
            res.status(500).send('error while connecting')
          }else{
            //connection got created and pass db name
            const dbname = connection.db('attainu')
            //make find query to collection
            dbname.collection('city').find({}).toArray((err,data)=>{
              if(err){
                res.status(500).send('error while fetching')
              }else{
                res.render('city',{title:'city page',citydata:data,menu})
              }
            })
          }
        })
        
    })

    // cityRouter.route('/')
    // .get(function(req,res){
    //     // res.send(city)
    //     res.render('city',{title:'City page',citydata:city,menu})
    // })
//http://localhost:8700/city/details
cityRouter.route('/details/:id')
    .get(function(req,res){
      var id = req.params.id
      var name = req.query.name
        res.send(`City Details ${id} ${name}` )
    })

    return cityRouter
}
module.exports=router