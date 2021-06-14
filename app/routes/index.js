const router = require("express").Router();

const memberRoutes = require('./member.routes');

router.use("/member",memberRoutes);

module.exports = router;