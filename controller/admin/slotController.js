const mongoosecon = require("../../db.js");
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require('fs');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');

const withAuth=require('../../routes/middleware');
const slotModel= require('../../models/slotModel');
const carSlotModel= require('../../models/carSlotModel');



exports.singleslotdata=(req,res)=>{
  var slotid=req.query.slotid;
  var response=[];


  slotModel.findOne({_id: slotid}, function (err, docs) { 
      if (err){ 
          console.log(err) 
      } 
      else{ 
            if(docs)
            {
                response = {          
                    msg:'Slot details are below!',
                    result:docs,                  
                    status:1
                };
                res.send(response);
            }
            else
            {
                response = {          
                  msg:'Slot is invalid!',
                  status:0
              };
              res.send(response);
            } 
             
        
        }
  }); 
  
 
      
}


exports.allslots=async (req,res)=>{

  var todayDate = new Date().toISOString().slice(0, 10);
  console.log(todayDate);

  var response=[];
  mongoose.set('debug', true);
  var perPage=parseInt(req.query.perPage);
  var offset=parseInt(req.query.offset);
//var query = slotModel.find({"created":todayDate}).skip(offset).limit(perPage);
/*var query =carSlotModel.aggregate([   
  
  { "$lookup": {
    "localField": "slotid",
    "from": "slot",
    "foreignField": "_id",
    "as": "slotdetails"
  } },
  {
    $unwind: {
      path: "$slotdetails",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    $project: {       
      carnumber: 1,           
      slotnumber: "$slotdetails.slotnumber",
      created: "$slotdetails.created",
      slotids: "$slotdetails._id", 
    }
  },
]);*/

var query =slotModel.aggregate([   
 // {$match:{"created":todayDate}},
  { "$lookup": {
    "localField": "_id",
    "from": "carslot",
    "foreignField": "slotid",
    "as": "slotdetails"
  } },
  {
    $unwind: {
      path: "$slotdetails",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    $project: {       
      slotnumber: 1,
      created:1,
      _id:1, 
      carnumber: "$slotdetails.carnumber", 
      carslotid:"$slotdetails._id", 
    }
  },
]);
  query.exec(function(err, slots) 
  {
     if(err)
     {
         res.send(err);
     }
     console.log(slots)
     if(slots)
     {  
       //get total notes   
       response = {          
        msg:'Slots are below!',
          result:slots,
          resulttotalnotes:0,
          status:1
      };
      res.send(response);
   
     }
     else{
      response = {
       
          msg:'Slot is invalid!',
          status:0
      };
      res.send(response);
     }
 
  });
   
  
 
      
}

exports.insertslot=(req,res)=>{
  
      var {slotnumber,editslotsec,slotid}=req.body;
      var todayDate = new Date().toISOString().slice(0, 10);
        if(editslotsec==0)
        {
          const slotsdata = new slotModel({
            slotnumber: slotnumber,
            created:todayDate
          });
  
          // Save Note in the database
          slotsdata.save()
          .then(data => { 
            response = {          
              msg:'Slot created successfully!',             
              status:1
            };
            res.send(response);
          }).catch(error => {
            res.status(500).send("Something went wrong");
          });

        }
        else{
          slotModel.updateOne({_id: slotid}, {
            slotnumber: slotnumber
          }, function(err, affected, resp) {

            if(err)
            {
              response = {        
                  msg:err,
                  status:0
              };
              res.send(response);
            }
            else{
              response = {   
                msg:'Slot updated successfully!',             
                status:1
              };
              res.send(response);
            }
          
          })
              
          
    }
}


exports.delslot=async (req,res)=>{

  var slotid=req.query.slotid;
  var query = slotModel.find({_id : slotid});

  query.exec(function(err, slots) 
  {
    if(err)
    {
        res.send(err);
    }
    console.log(slots)
    if(slots)
    {  
    
        response = {          
          msg:'This slot is booked, you are unable to delete it until it is unbooked!',
           
            status:2
        };
        res.send(response);
     
  
    }
    else{
          //delete the user
          slotModel.findOneAndRemove({_id : slotid}, function (err,offer){
            if(err)
            {
              response = {

                  msg:err,
                  status:0
              };
              res.send(response);
            }
            else{
              

            
              response = {          
                msg:'Slot deleted successfully!',             
                status:1
              };
              res.send(response);
            }
        });
    }

  });


}

exports.bookslot=(req,res)=>{
  
  var {carnumber,slotnumber,editslotsec,slotid}=req.body;
  var todayDate = new Date().toISOString().slice(0, 10);
    if(editslotsec==0)
    {
      const slotsdata = new carSlotModel({
        carnumber: carnumber,
        slotid:slotnumber
      });

      // Save Note in the database
      slotsdata.save()
      .then(data => { 

        //update in slot table

        slotModel.updateOne({_id: slotnumber}, {
          booked: 1
        }, function(err, affected, resp) {
  
          if(err)
          {
            response = {        
                msg:err,
                status:0
            };
            res.send(response);
          }
          else{
            response = {          
              msg:'Slot booked successfully!',             
              status:1
            };
            res.send(response);
          }
        
        })

       
      }).catch(error => {
        res.status(500).send("Something went wrong");
      });

    }
   /* else{
          slotModel.updateOne({_id: slotid}, {
            slotnumber: slotnumber
          }, function(err, affected, resp) {

            if(err)
            {
              response = {        
                  msg:err,
                  status:0
              };
              res.send(response);
            }
            else{
              response = {   
                msg:'Slot updated successfully!',             
                status:1
              };
              res.send(response);
            }
          
          })
              
          
    }*/
}

exports.unbookslot=async (req,res)=>{

  var todayDate = new Date().toISOString().slice(0, 10);
  console.log(todayDate);

  var response=[];
 // mongoose.set('debug', true);
  var perPage=parseInt(req.query.perPage);
  var offset=parseInt(req.query.offset);
  var query = slotModel.find({"created":todayDate,"booked":0}).skip(offset).limit(perPage);

  query.exec(function(err, slots) 
  {
    if(err)
    {
        res.send(err);
    }
    console.log(slots)
    if(slots)
    {  
      //get total notes   
      var query_total = slotModel.find({"created":todayDate}); 
      query_total.exec(function(errv, notes_total) 
      {
        if(errv)
        {
            res.send(errv);
        }
        response = {          
          msg:'Slots are below!',
            result:slots,
            resulttotalnotes:notes_total,
            status:1
        };
        res.send(response);
      })
  
    }
    else{
      response = {
      
          msg:'Slot is invalid!',
          status:0
      };
      res.send(response);
    }

  });

}

exports.searchslots=(req,res)=>{

  var {carnumber,type,slotnumber}=req.body;
  var todayDate = new Date().toISOString().slice(0, 10);
  console.log(todayDate);
  if(type==1)
  {
    var query_total = carSlotModel.find({"carnumber":carnumber}); 
    query_total.exec(function(errv, slots_total) 
    {
      if(errv)
      {
          res.send(errv);
      }
      var test = slots_total;
      var length = Object.keys(slots_total).length;
      if(length>0)
      {
        console.log('-------------------------')
        console.log(slots_total[0].slotid)

        mongoose.set('debug', true);
        var query =slotModel.aggregate([   
          { $match: { "_id": slots_total[0].slotid}  },
          { "$lookup": {
            "localField": "_id",
            "from": "carslot",
            "foreignField": "slotid",
            "as": "slotdetails"
          } },
          {
            $unwind: {
              path: "$slotdetails",
              "preserveNullAndEmptyArrays": true
            }
          },
          {
            $project: {       
              slotnumber: 1,
              created:1,
              _id:1, 
              carnumber: "$slotdetails.carnumber", 
              carslotid:"$slotdetails._id", 
            }
          },
        ]);
          query.exec(function(err, slots) 
          {
            if(err)
            {
                res.send(err);
            }
            console.log(slots)
            if(slots)
            { 
                //get total notes   
                response = {          
                  msg:'Slots are below!',
                    result:slots,
                    resulttotalnotes:0,
                    status:1
                };
                res.send(response);
            }
            else{
              response = {
              
                  msg:'Slot is invalid!',
                  status:0
              };
              res.send(response);
            }
        
          });

      }
      else{
        response = {          
          msg:'Not booked any slot.Please book one!',
          
            status:2
        };
        res.send(response);
      }
    
    })
  }
  else{
    var query =slotModel.aggregate([   
      { $match: { "slotnumber":slotnumber}  },
      { "$lookup": {
        "localField": "_id",
        "from": "carslot",
        "foreignField": "slotid",
        "as": "slotdetails"
      } },
      {
        $unwind: {
          path: "$slotdetails",
          "preserveNullAndEmptyArrays": true
        }
      },
      {
        $project: {       
          slotnumber: 1,
          created:1,
          _id:1, 
          carnumber: "$slotdetails.carnumber", 
          carslotid:"$slotdetails._id", 
        }
      },
    ]);
      query.exec(function(err, slots) 
      {
        if(err)
        {
            res.send(err);
        }
        console.log(slots)
        if(slots)
        { 
            //get total notes   
            response = {          
              msg:'Slots are below!',
                result:slots,
                resulttotalnotes:0,
                status:1
            };
            res.send(response);
        }
        else{
          response = {
          
              msg:'Slot is invalid!',
              status:0
          };
          res.send(response);
        }
    
      });
  }

 
}


exports.freeslot=(req,res)=>{
  var {carslotid,id}=req.body;

  slotModel.updateOne({_id: id}, {
    booked: 1
  }, function(err, affected, resp) {

    if(err)
    {
      response = {        
          msg:err,
          status:0
      };
      res.send(response);
    }
    else{
      carSlotModel.findOneAndRemove({_id : carslotid}, function (err,offer){
        if(err)
        {
          response = {
    
              msg:err,
              status:0
          };
          res.send(response);
        }
        else{
          
    
        
          response = {          
            msg:'Slot free up successfully!',             
            status:1
          };
          res.send(response);
        }
    });
    }
  
  })

}
