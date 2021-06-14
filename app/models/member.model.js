const mongoose = require('mongoose');

const Member = mongoose.model(
    "Member",
    new mongoose.Schema({
        name : {type : String, required : true}
    })
);

module.exports = Member;