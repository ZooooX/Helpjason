const router = require('express').Router();
const memberController = require('../controllers/member.controller');

//basic memebr route
router.route("/")
    .get(memberController.getMembers)
    .post(memberController.createMember);

//member route with member name param
router.route("/:name")
    .delete(memberController.deleteMember);    

module.exports = router;