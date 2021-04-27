const router = require('express').Router();
const withAuth=require('../middleware');
const authController=require('../../controller/admin/authController');
router.post('/logout',function(req,res){    
  response = {
         
    msg:'User logged out successfully!!',
    status:1
 };
 res.send(response); 
 
 });
 console.log(232323)
 router.post("/login", authController.login);

module.exports=router;
