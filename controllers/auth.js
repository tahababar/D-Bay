import User from "../models/user"
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";




//async and await added for delays and for function to execute asyncrounously
export const register = async (req,res)=>{
    const {name, email, password, secret} = req.body;
    //validation
    if(!name) return res.json({
        error: "Name is required"
    });
    if(!password || password.length < 6) {
        return res.json({
            error: "Password is required and should be 6 characters long"
        })
    }
    if(!secret) {
        return res.json({
            error: "Security answer is required"
        })
    }
    //to check if the same user is not registering again
    //findOne looks for at least one similar entry in DB 
    const exist = await User.findOne({email});
    if(exist) {
        return res.json({
            error: "Email is already registered"
        })
    }
    //hashing password
    const hashedPassword = await hashPassword(password);
    const user = new User({name,email,password: hashedPassword,secret, username: nanoid(6)});
    try{
        await user.save(); //saving new user in DB
        console.log("Successful Registration")
        return res.json({
            ok:true
        });
    } catch (err) {
        console.log("Register Failed", err);
        return res.status(400).send("Error. Try again");
    }


};

//for user specific page to be accessed, we will need to send a token to the frontend based on that user //npm i jsonwebtoken express-jwt
export const login = async (req, res) => {
   console.log(req.body);
    try{
        //check if our db has user with that email
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.json({
                error: "No user found"
            })
        }
        //check password if user found
        const match = await comparePassword(password, user.password);
        if (!match){
            return res.json({
                error: "Wrong password"
            })
        } 
        //create signed token
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {}); //third paramter is if we want to add an expiration date for the token, so user automatically logs out after that period..we can add this functionality later but it will also need some added functioanlity in frontend to deal with this
        user.password = undefined;
        user.secret = undefined; //just to make sure that we are not changing these two in DB and these are not sent back to the frontend
        res.json(
            {
                token,
                user 
            } //info about user document, excluding password and secret will be sent to frontend and then we will be using the same token sent
            //back in backend (coming from frontend) to allow certain routers and features to a particular user and not other ones
        );
    } catch (err){
        console.log(err)
        return res.status(400).send("Error logging in. Try again.")
    }
};

export const currentUser = async(req, res)=> {
    //send token in headers from client
    //verify token using expressJwt  
    //if verified you will get user id from that token (used during login to create signed token)
    //based on that user id, find that user from db,
    // if found, send successful response
    try{
        const user = await User.findById(req.user._id);
        res.json({ok:true});
    }catch (err){
        console.log(err);
        res.sendStatus(400);
    }
};

export const forgotPassword = async (req, res) => {
    const {email, newPassword, secret} = req.body;
    if (!newPassword || newPassword < 6){
        return res.json({
            error: "New password is required and should be 6 characters long."
        });
    }
    if (!secret) {
        return res.json({
            error: "Security answer is required"
        });
    }
    const user = await User.findOne({email, secret}); //both arguments as both are required to reset password
    if (!user){
        return res.json({
            error: "We cannot verify with you with those details"
        });
    }
    try{
        const hashed = await hashPassword(newPassword);
        await User.findByIdAndUpdate(user._id, {password:hashed}); //updates password and deletes old one 
        return res.json({
            success: "Password updated. You can log in with your new password now."
        });
    }catch (err){
        return res.json({
            error: "Something is wrong. Please try again later."
        }); 
    }
};

export const profileUpdate = async(req,res)=>{
try{
    const data = {}
    if (req.body.username) {
        data.username = req.body.username;
      }
      if (req.body.about) {
        data.about = req.body.about;
      }
      if (req.body.name) {
        data.name = req.body.name;
      }
      if (req.body.password) {
        if (req.body.password.length < 6) {
          return res.json({
            error: "Password is required and should be min 6 characters long",
          });
        } else {
          data.password = await hashPassword(req.body.password);
        }
      }
      if (req.body.secret) {
        data.secret = req.body.secret;
      }
      let user = await User.findByIdAndUpdate(req.user._id, data);
      user.password = undefined
      user.secret = undefined //undeined as we dont want to send password etc to frontend
      res.json(user);
 }catch(err){
    if(err.code == 11000){
        return res.json({
            error: "Duplicate username"
        })
    }
    console.log(err)
}
};

export const findPeople = async (req,res) => {
    try{
        const user = await User.findById(req.user._id);
        let following = user.following; //check the people user follows
        following.push(user._id) //add own user id in the list of these users
        const people = await User.find({ _id: { $nin: following } }).limit(10); //add everyone except urself and the people u follow in this list..show the first 20 users that you dont follow
        res.json(people)
    }catch (err){
        console.log(err)
    }
};

export const addFollower = async (req, res, next) => {
    try {
      const user = await User.findByIdAndUpdate(req.body._id, {
        $addToSet: { followers: req.user._id },
      });
      next();
    } catch (err) {
      console.log(err);
    }
  };
  
  export const userFollow = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        {
          $addToSet: { following: req.body._id },
        },
        { new: true }
      ).select("-password -secret"); //to not send password and secret
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  };
  

  export const userFollowing = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const following = await User.find({ _id: user.following }).limit(10);
      res.json(following);
    } catch (err) {
      console.log(err);
    }
  };

  /// middleware
export const removeFollower = async (req, res, next) => {
    try {
      const user = await User.findByIdAndUpdate(req.body._id, {
        $pull: { followers: req.user._id },
      });
      next();
    } catch (err) {
      console.log(err);
    }
  };
  
  export const userUnfollow = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body._id },
        },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  };

  export const getUser = async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username }).select(
        "-password -secret"
      );
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  };

  export const searchUser = async (req, res) => {
    const { query } = req.params;
    if (!query) return;
    try {
      // $regex is special method from mongodb
      // The i modifier is used to perform case-insensitive matching
      const user = await User.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { username: { $regex: query, $options: "i" } },
        ],
      }).select("-password -secret");
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  };
  