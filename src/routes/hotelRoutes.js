var express = require('express');
var hotelRouter = express.Router();
var db = require('mongodb').MongoClient
// var url = "mongodb://localhost:27017"
var url ='mongodb+srv://Ramya_21:mongo@123@cluster0.wqnkn.mongodb.net/attainu?retryWrites=true&w=majority'

function router(menu){
hotelRouter.route('/')
    .get(function(req,res){
        // res.send('hotels')
        db.connect(url,(err,connection)=>{
          if(err){
            res.status(500).send('error while connecting')
          }else{
            //connection got created and pass db name
            const dbname = connection.db('attainu')
            //make find query to collection
            dbname.collection('hotels').find({}).toArray((err,data)=>{
              if(err){
                res.status(500).send('error while fetching')
              }else{
                res.render('hotel',{title:'Hotel page',hoteldata:data,menu})
              }
            })
          }
        })
        
    })

//http://localhost:8700/hotel/details
hotelRouter.route('/details/:id')
      .get(function(req,res){
        //var id = req.params.id
        var {id} = req.params
        db.connect(url,(err,connection) => {
          if(err){
            res.status(500).send("Error while connecting")
          }else{
            const dbo = connection.db('attainu')
            dbo.collection('hotels').findOne({_id:id},(err,data)=>{
              if(err){
                res.status(501).send("Error while fetching")
              }else{
                
                res.render('hotelDetails',{title:"Hotel Details Page",hoteldata:data,menu})
              }
            })
          }
        })
      })
    
   return hotelRouter
}
module.exports=router

