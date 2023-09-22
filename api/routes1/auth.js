const router=require("express").Router()
const Users=require("../models/Users")
const bcrypt=require("bcrypt")
//REGISTER
router.post("/register",async(req,res)=>{
 
   try{
    //encrypting the password using bcrypt and salt=10
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(req.body.password,salt)
    //generating new user
    const newUser=new Users({
        userName:req.body.userName,
        email:req.body.email,
        password:hashedPassword,
       })
       //save user and return response
    const user=await newUser.save()
    res.status(200).json(user)
   }
   catch(err){
    res.status(500).json(err)
   }
})

//LOGIN
router.post("/login",async(req,res)=>{
    try{
        //finding the user with the given emailid
        const user=await Users.findOne({email:req.body.email})
        //if user is not in the database
        !user && res.status(404).send("User Not Found")
        //validating the password
        const validPassword= await bcrypt.compare(req.body.password,user.password)
        //if not a valid password print wronf password or return the user
        if(!validPassword)
          res.status(400).json("Wrong Password")
          else{
            res.status(200).json(user)
          }
    }
  catch(err){
   res.status(500).json(err)
  }
})
module.exports=router