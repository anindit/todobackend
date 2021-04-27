const router = require('express').Router();
const withAuth=require('../middleware');
const slotController=require('../../controller/admin/slotController');

 router.post("/insertslot",withAuth, slotController.insertslot);
 router.get("/singleslotdata",withAuth, slotController.singleslotdata);
 router.get("/allslots",withAuth, slotController.allslots);
 router.get("/delslot",withAuth, slotController.delslot);
 router.post("/bookslot", withAuth,slotController.bookslot);
 router.get("/unbookslot",withAuth, slotController.unbookslot);
 router.post("/searchslots",withAuth, slotController.searchslots);
 router.post("/freeslot",withAuth, slotController.freeslot);
 

module.exports=router;
