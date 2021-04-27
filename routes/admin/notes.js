const router = require('express').Router();
const withAuth=require('../middleware');
const noteController=require('../../controller/admin/noteController');

 router.post("/insertnote",withAuth, noteController.insertnote);
 router.get("/singlenotedata",withAuth, noteController.singlenotedata);
 router.get("/allnotes",withAuth, noteController.allnotes);
router.get("/delnote",withAuth, noteController.delnote);
 //router.post("/userupload", withAuth,noteController.userupload);
 //router.get("/userslists",withAuth, noteController.userslists);


module.exports=router;
