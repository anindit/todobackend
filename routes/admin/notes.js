const router = require('express').Router();
const withAuth=require('../middleware');
const noteController=require('../../controller/admin/noteController');

 router.post("/notes/insertnote",withAuth, noteController.insertnote);
 router.get("/notes/singlenotedata",withAuth, noteController.singlenotedata);
 router.get("/notes/allnotes",withAuth, noteController.allnotes);
router.get("/notes/delnote",withAuth, noteController.delnote);
 //router.post("/userupload", withAuth,noteController.userupload);
 //router.get("/userslists",withAuth, noteController.userslists);


module.exports=router;
