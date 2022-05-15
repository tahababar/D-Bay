import expressJwt from "express-jwt";
import Post from "../models/post"

export const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
});

export const canEditDeletePost = async (req,res,next)=>{
    //to make sure that the post being edited/deleted belongs to the logged in user
    try{
        const post = await Post.findById(req.params._id)
        if(req.user._id != post.postedBy){
            return res.status(400).send("Unauthorized");
        }else{
            next(); //successful middleware check so will go on next to  execute UPDATE/DELETE funcitons called  
        }
    }catch (err){
        console.log(err)
    }
}