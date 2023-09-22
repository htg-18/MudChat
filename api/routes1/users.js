const Users=require("../models/Users")
const router=require("express").Router()
const bcrypt=require("bcrypt")

//Update Users
router.put("/:id",async(req,res)=>{
    //Check if the requesting user is the owner of the account or has the admin access
    if(req.body.userId===req.params.id||req.body.isAdmin)
    {
        //if the req has a password we need to hash it before adding to the database
       if(req.body.password){
        try{
            const salt =await bcrypt.genSalt(10)
            req.body.password=await bcrypt.hash(req.body.password,salt)
        }
        catch(err){
            return res.status(500).json(err)
        }
       }
       try{
        //Update the users account form the id provided in the params
        const user=await Users.findByIdAndUpdate(req.params.id,{
            //set the new values
            $set:req.body,
           })
           res.status(200).json("Accout has been updated")
       }
     catch(err){
        return res.status(500).json(err)
     }
    }
    else{
        //unauthorised access
        return res.status(403).json("You can only update your profile")
    }
})

//Delete users
router.delete("/:id",async(req,res)=>{
    //Check if the requesting user is the owner of the account or has the admin access
    if(req.body.userId===req.params.id||req.body.isAdmin)
    {
        //if the req has a password we need to hash it before adding to the database
      
       try{
        //Update the users account form the id provided in the params
        const user=await Users.findByIdAndDelete(req.params.id)
           res.status(200).json("Accout has been deleted")
       }
     catch(err){
        return res.status(500).json(err)
     }
    }
    else{
        //unauthorised access
        return res.status(403).json("You can only delete your profile")
    }
})

//Get Users
router.get("/",async(req,res)=>{
    const userId=req.query.userId;
    const userName=req.query.userName;
    try{
        //find the user by id
       const user=userId?await Users.findById(userId):await Users.findOne({userName:userName})
       //do not send unnecessary info like password and updatedAt
       const{password,updatedAt,...other}=user._doc
       res.status(200).json(other)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Follow a user
router.put("/:id/follow",async(req,res)=>{
    //CHeck if both the users are the same or not
    if(req.body.userId!==req.params.id)
    {
       try{
           //the user that is being followed
           const user =await Users.findById(req.params.id)
           //user that is trying to follow
           const currentUser=await Users.findById(req.body.userId)
           //check if the user is already followed by the current user
           if(!user.follower.includes(req.body.userId)){
            //add the user to the list of follwers of the  user
            await user.updateOne({$push:{follower:req.body.userId}})
            //add the user to the list of following of the current user
            await currentUser.updateOne({$push:{following:req.params.id}})
            res.status(200).json("You have followed this user")
           }
           else{
              res.status(403).json("You are already following this user")
           }
       }
       catch(err){
          res.status(500).json(err)
       }
    }
    else{
        res.status(403).json("you cannot follow yourself")
    }
})

//unfollow a user
router.put("/:id/unfollow",async(req,res)=>{
    //CHeck if both the users are the same or not
    if(req.body.userId!==req.params.id)
    {
       try{
           //the user that is being unfollowed
           const user =await Users.findById(req.params.id)
           //user that is trying to unfollow
           const currentUser=await Users.findById(req.body.userId)
           //check if the user is already followed by the current user
           if(user.follower.includes(req.body.userId)){
            //delete the user from the list of followers of this user
            await user.updateOne({$pull:{follower:req.body.userId}})
            //delete the user form the list of following of this user
            await currentUser.updateOne({$pull:{following:req.params.id}})
            res.status(200).json("You have unfollowed this user")
           }
           else{
              res.status(403).json("You are already not following this user")
           }
       }
       catch(err){
          res.status(500).json(err)
       }
    }
    else{
        res.status(403).json("you cannot unfollow yourself")
    }
})

//get friends
// router.get("/friends/:userId", async (req, res) => {
//     try {
//       const user = await Users.findById(req.params.userId);
//       const friends = await Promise.all(
//         user.following.map((friendId) => {
//           return Users.findById(friendId);
//         })
//       );
//       let friendList = [];
//       friends.map((friend) => {
//         const { _id, userName, profilePicture } = friend;
//         friendList.push({ _id, userName, profilePicture });
//       });
//       res.status(200).json(friendList)
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
router.get("/friends/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const user = await Users.findById(userId);
      const friends = await Promise.all(
        user.following.map(async (friendId) => {
          if (friendId && friendId.toString() !== "") {
            // Ignore if friendId is an empty string
            return Users.findById(friendId);
          }
        })
      );
      const friendList = friends
        .filter((friend) => friend && friend._id.toString() !== userId) // Filter out null values and the user
        .map((friend) => ({
          _id: friend._id,
          userName: friend.userName,
          profilePicture: friend.profilePicture,
        }));
      res.status(200).json(friendList);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  

module.exports=router