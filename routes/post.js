import express, { Router } from "express"


const router = express.Router();

import {requireSignin, canEditDeletePost} from "../middlewares";
import { createPost, uploadImage, postsByUser, userPost, updatePost, deletePost, newsFeed, likePost, unlikePost, addComment, removeComment, publicFeed, getPosts, getPersonalPosts}
from "../controllers/post";

router.post("/create-post", requireSignin, createPost);

//npm i express-formidable to use formdata from frontend in uploadImage
import formidable from "express-formidable";

router.post(
    "/upload-image",
    requireSignin,
    formidable({ maxFileSize: 5 * 1024 * 1024 }),
    uploadImage
  );
  
  //router.get("/user-posts", requireSignin, postsByUser);
  router.get("/user-post/:_id", requireSignin, userPost)
  router.put("/update-post/:_id", requireSignin, canEditDeletePost, updatePost)
  router.delete("/delete-post/:_id", requireSignin, canEditDeletePost, deletePost)
  router.get("/user-posts", requireSignin, newsFeed)
  router.put("/unlike-post", requireSignin, unlikePost)
  router.put("/like-post", requireSignin, likePost)
  router.put("/add-comment", requireSignin, addComment)
  router.put("/remove-comment", requireSignin, removeComment)
  router.get("/public-posts", publicFeed)
  router.get("/post/:username", getPosts)
  router.get("/user-personal-posts", requireSignin, getPersonalPosts)
  

module.exports = router;