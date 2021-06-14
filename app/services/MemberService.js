const Member = require('../models/member.model');

class MemberService {
    create(name){
        const member = new Member({
            name : name
        });

        return member.save();
    }

    getAll(){
        return Member.find().exec();
    }

    findByName(name){
        return Member.findOne({name:name}).exec();
    }

    delete(name){
        return Member.findOneAndDelete({name:name}).exec();
    }
}

module.exports = MemberService;