const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { options } = require("../routes/user.js");
require("dotenv").config();



exports.register = async (req,res) => {
    try{
       
        const {companyName,ownerName,rollNo, ownerEmail, accessCode} = req.body;
        
        const existingUser = await User.findOne({ownerEmail});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already Exists',
            });
        }

       
        let hashedPassword;
        try{
            hashedPassword = await bcryptjs.hash(accessCode, 10);
        }
        catch(err) {
            return res.status(500).json({
                success:false,
                message:'Error in hashing Password',
            });
        }


        const user = await User.create({
            companyName,ownerEmail,accessCode:hashedPassword,rollNo,ownerName
        })

        return res.status(200).json({
            success:true,
            message:'register up successfully',
        });

    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be registered',
        });
    }
}


exports.auth = async (req,res) => {
    try {

   
        const {ownerEmail, accessCode} = req.body;
        
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:'PLease fill all the details',
            });
        }

        let user = await User.findOne({ownerEmail});
      
        if(!user) {
            return res.status(401).json({
                success:false,
                message:'User is not registered',
            });
        }

        const payload = {
            ownerEmail:user.email,
            id:user._id,
       
        };
       
        if(await bcryptjs.compare(ownerEmail,user.ownerEmail) ) {
         
            let token =  jwt.sign(payload, 
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"2h",
                                });

                                

            user = user.toObject();
            user.token = token;
            user.accessCode = undefined;

            const options = {
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
            }

            res.cookie("Cookie", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'hewwo',
            });
        }
        else {
            //passwsord do not match
            return res.status(403).json({
                success:false,
                message:"Password Incorrect",
            });
        }

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Fail',
        });

    }
}



exports.trains=async(req,res)=>{
    try{
      
        const datafeatch=await User.find({})

        res.status(200)
        .json({
            success:true,
            data:datafeatch,
            message:"API successfully called",
        });

    }catch{
        console.log(error);
        return res.status(500).json({
          success:false,
          message:'server error',
      });

    }
}