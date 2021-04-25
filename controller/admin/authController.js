const mongoosecon = require("../../db.js");
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const path = require("path");
var mongoose = require('mongoose');

const withAuth=require('../../routes/middleware');
const userModel= require('../../models/userModel');


console.log(6565656)

exports.login=async (req,res)=>{

  const {email,password}=req.body;
  console.log(req.body)
  if(!email || !password)
  {
    response = {
                    
      msg:'Problem in login',
      status:0
    };
    res.send(response);
  }
  else{
   // mongoose.set('debug', true);
    userModel.findOne({email: {$eq: email}}, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Result : ", docs); 
            if(docs)
            {
              
              bcrypt.compare(password,docs.password,(error,responses)=>{
                if(responses)
                {
                  var uid=docs._id;
                  var token=jwt.sign({id:uid},process.env.SECRET_KEY,{
                    expiresIn: 86400 // expires in 24 hours
                  });
              
            
                  response = {          
                    msg:'User logged in successfully!',
                    uid:uid,                                  
                    token:token,
                    status:1
                };
                res.send(response);
                
                }
                else{
                  response = {          
                      msg:'Wrong username/password combination!',
                      status:0
                  };
                  res.send(response);

                }
            })
                       
          }
          else{
            response = {
         
              msg:'Email does not exists!',
              status:0
           };
           res.send(response);
          }
            
          
        } 
    }); 


  }
}


