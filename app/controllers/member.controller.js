const MemberService = require('../services/MemberService');

const memberServiceInstance = new MemberService();

//Call the create member function with the request body
exports.createMember = (req, res) => {
    memberServiceInstance.findByName(req.body.name)
        .then((member) => {
            if(member != null) {
                console.log('User already exists !');
                return res.status(500).send({message : 'Member already exists !'});
            }

            memberServiceInstance.create(req.body.name)
                .then((member) => {
                    console.log(`Member ${member.name} successfully created !`);
                    return res.status(200).send({message:`Member ${member.name} successfully created !`});
                }).catch((err) => {
                    return res.status(500).send({message : err});
            });
        }).catch((err) => {
            return res.status(500).send({message : err});
        });
    
}

//Call the get all members function
exports.getMembers = (req, res) => {
    memberServiceInstance.getAll()
        .then((members) => {
            return res.status(200).send(members);
        }).catch((err) => {
            return res.status(500).send({message : err});
        });
}

//Call the delete function with the request param
exports.deleteMember = (req,res) => {
    memberServiceInstance.delete(req.params.name)
        .then(() => {
            console.log(`Member deleted !`);
            return res.status(200).send({message:`Member ${req.params.name} successfully deleted !`});
        }).catch((err) => {
            return res.status(500).send({message : err});
        });
}