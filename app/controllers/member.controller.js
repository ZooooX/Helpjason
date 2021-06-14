const MemberService = require('../services/MemberService');

const memberServiceInstance = new MemberService();

exports.createMember = (req, res) => {
    console.log("name : " + req.body.name);
    memberServiceInstance.findByName(req.body.name)
        .then((member) => {
            if(member != null) {
                console.log('User already exists !');
                return res.status(500).send({message : 'Member already exists !'});
            }

            memberServiceInstance.create(req.body.name)
                .then((member) => {
                    console.log(`Member ${member.name} successfully created !`);
                    return res.status(200);
                }).catch((err) => {
                    return res.status(500).send({message : err});
            });
        }).catch((err) => {
            return res.status(500).send({message : err});
        });
    
}


exports.getMembers = (req, res) => {
    memberServiceInstance.getAll()
        .then((members) => {
            return res.status(200).send(members);
        }).catch((err) => {
            return res.status(500).send({message : err});
        });
}

exports.deleteMember = (req,res) => {
    memberServiceInstance.delete(req.params.name)
        .then(() => {
            console.log(`Member deleted !`);
            return res.status(200);
        }).catch((err) => {
            return res.status(500).send({message : err});
        });
}