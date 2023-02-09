const userModel =require('../models/users');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

module.exports={
    create: function(req, res, next){
        userModel.create({
            name: req.body.name, 
            email: req.body.email,
            password: req.body.password,
        },function(error, result){
            if(error){
                next(error);
            }
            else{
                res.json({
                status: "success", 
                message: "User added successfully",
                 data:null});
            }
        });
        
    },
    authenticate: function(req,res, next){
        userModel.findOne({
            email: req.body.email
        },
        function(error,userInfo){
            if(error){
                next(error);
            }
            else{
                if(bcrypt.compareSync(req.body.password,userInfo.password)){
                    const token =jwt.sign({id: userInfo._id},
                        req.app.get('secretKey'),{expiresIn:'1h'});
                    
                    res.json({
                        status: "success",
                        message: "user found!!",
                        data: {user: userInfo, token: token}
                    });

                }
                else{
                    res.json({
                        status: "error",
                        message: "Invalid emial/password!!",
                        data: null
                    });
                }
            }
        });
    }
}