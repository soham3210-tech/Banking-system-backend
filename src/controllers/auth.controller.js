const userModel = require("../models/user.model");
const transporter = require("../config/nodemailer");

const jwt=require("jsonwebtoken")


async function register(req, res) {

    // save user...

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: "Welcome to Banking System",
        text: "Your account has been created successfully."
    });

    res.json({
        message: "Registration successful"
    });
}











async function userRegisterController(req, res) {
  const { email, password, name } = req.body;
  const isExits = await userModel.findOne({ email: email });
 if(isExits){
    res.staus(201).json({
        message:"user already exits man ",
        status:"failed"

        
    })
   const user =await userModel.create({
    email,password,name


})

   const token =jwt.sign({userid=user._id},process.env.jwt_secret,{expiersIn:"3d"})

 }

}

async function userLoginController(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email }).select("+password")

    if (!user) {
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }

    const isValidPassword = await user.comparePassword(password)

    if (!isValidPassword) {
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }

const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET,  { expiresIn: "3d" });
    res.cookie("token", token)

    res.status(200).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })

}
async function userLogoutController(req, res) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]

    if (!token) {
        return res.status(200).json({
            message: "User logged out successfully"
        })
    }



    await tokenBlackListModel.create({
        token: token
    })

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })

}


















module.exports = {

    register

}
module.exports = {
    userRegisterController,
    userLoginController,
    userLogoutController
}