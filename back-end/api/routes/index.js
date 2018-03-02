var express = require('express'),
  router = express.Router(),
  maiCtrl = require('../controllers/maiController');

  const authentication = require('../controllers/authentication')(router);
  app = express();
	memberCtrl = require('../controllers/MemberController');


//-------------------------------mai Routes-----------------------------------
router.get('/mai/getmais', maiCtrl.getmais);
router.get('/mai/getmai/:maiId', maiCtrl.getmai);
router.get(
  '/mai/getmaisBelowPrice/:price',
  maiCtrl.getmaisBelowPrice
);
router.post('/mai/createmai', maiCtrl.createmai);
router.patch('/mai/updatemai/:maiId', maiCtrl.updatemai);
router.delete('/mai/deletemai/:maiId', maiCtrl.deletemai);


app.use('/authentication' , authentication);

//-------------------------------Member Routes-----------------------------------
router.get('/member/getMembers', memberCtrl.getMembers);
router.post('/member/createMember', memberCtrl.createMember);
router.patch('/member/updateMember/:memberId', memberCtrl.updateMember);
router.delete('/member/deleteMember/:memberId', memberCtrl.deleteMember);

//------------------------------User Routes-----------------------------------


module.exports = router;
