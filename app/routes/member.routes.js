const router = require('express').Router();
const memberController = require('../controllers/member.controller');

router.route("/")
    .get(memberController.getMembers)
    .post(memberController.createMember);

router.route("/:name")
    .delete(memberController.deleteMember);    

module.exports = router;