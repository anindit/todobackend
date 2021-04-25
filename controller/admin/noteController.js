const mongoosecon = require("../../db.js");
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require('fs');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');

const withAuth=require('../../routes/middleware');
const notesModel= require('../../models/notesModel');



exports.singlenotedata=(req,res)=>{
  var noteid=req.query.noteid;
  var response=[];


  notesModel.findOne({_id: noteid}, function (err, docs) { 
      if (err){ 
          console.log(err) 
      } 
      else{ 
            if(docs)
            {
                response = {          
                    msg:'Note details are below!',
                    result:docs,                  
                    status:1
                };
                res.send(response);
            }
            else
            {
                response = {          
                  msg:'Note is invalid!',
                  status:0
              };
              res.send(response);
            } 
             
        
        }
  }); 
  
 
      
}


exports.allnotes=async (req,res)=>{

  
  var response=[];
  //mongoose.set('debug', true);
  var perPage=parseInt(req.query.perPage);
  var offset=parseInt(req.query.offset);
var query = notesModel.find().skip(offset).limit(perPage);
  query.exec(function(err, notes) 
  {
     if(err)
     {
         res.send(err);
     }
    // console.log(notes)
     if(notes)
     {  
       //get total notes   
       var query_total = notesModel.find(); 
       query_total.exec(function(errv, notes_total) 
      {
        if(errv)
        {
            res.send(errv);
        }
        response = {          
          msg:'Notes are below!',
            result:notes,
            resulttotalnotes:notes_total,
            status:1
        };
        res.send(response);
      })
   
     }
     else{
      response = {
       
          msg:'Note is invalid!',
          status:0
      };
      res.send(response);
     }
 
  });
   
  
 
      
}

exports.insertnote=(req,res)=>{
  
      var {notestitle,notesdesc,editnotesec,noteid}=req.body;
        if(editnotesec==0)
        {
          const note = new notesModel({
            title: notestitle, 
            desciption: notesdesc
          });
  
          // Save Note in the database
          note.save()
          .then(data => { 
            response = {          
              msg:'Note created successfully!',             
              status:1
            };
            res.send(response);
          }).catch(error => {
            res.status(500).send("Something went wrong");
          });

        }
        else{
          notesModel.updateOne({_id: noteid}, {
            title: notestitle, 
            desciption: notesdesc
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
                msg:'Note updated successfully!',             
                status:1
              };
              res.send(response);
            }
          
          })
              
          
    }
}


exports.delnote=async (req,res)=>{

  var noteid=req.query.noteid;


  //delete the user
  notesModel.findOneAndRemove({_id : noteid}, function (err,offer){
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
          msg:'Note deleted successfully!',             
          status:1
        };
        res.send(response);
      }
  });
}



