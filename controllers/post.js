import Post from "../models/post"
import cloudinary from "cloudinary";
import User from "../models/user"

//cloudinary npm i cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

export const createPost = async (req,res) =>{

    const {content} = req.body
    const {contact} = req.body
    const {price} = req.body
    const {image} = req.body
    if (!content.length){
        return res.json({
            error: "Content is required"
        })
    }
    if (!contact.length){
        return res.json({
            error: "Contact info is required"
        })
    }
    if (!price.length){
        return res.json({
            error: "Selling price is required"
        })
    }
try{
    const post = new Post({content, contact, price, image, postedBy: req.user._id})
    post.save()
    res.json(post);
}catch (err){
    console.log(err)
    res.sendStatus(400)
}
}

export const uploadImage = async (req, res) => {
    // console.log("req files => ", req.files);
    try {
      const result = await cloudinary.uploader.upload(req.files.image.path);
      // console.log("uploaded image url => ", result);
      res.json({
        url: result.secure_url,
        public_id: result.public_id,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const postsByUser = async (req, res) => {
    try {
      const posts = await Post.find()
        .populate("postedBy", "_id name image")
        .sort({ createdAt: -1 })
        .limit(10);
      // console.log('posts',posts)
      res.json(posts);
    } catch (err) {
      console.log(err);
    }
  };

  export const userPost = async (req, res) => {
try{
  const post = await Post.findById(req.params._id);
  res.json(post);
}catch(err){
  console.log(err);
}
  };

export const updatePost  = async (req,res) => {
  console.log("postupdate", req.body)
  try{
    const post = await Post.findByIdAndUpdate(req.params._id, req.body,{
      new: true
      
    })
    res.json(post);
  }catch(err){
    console.log(err)
  }
}

export const deletePost  = async(req,res) => {
  try{
  const post = await Post.findByIdAndDelete(req.params._id)
  if(post.image && post.image.public_id){
    const image = await cloudinary.uploader.destroy(post.image.public_id)
  }
  res.json({ok:true});
  }catch(err){
    console.log(err)
  }

}

export const newsFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    let following = user.following;
    following.push(req.user._id);

    const posts = await Post.find({ postedBy: { $in: following } })
    .populate("postedBy", "_id name image")
    .populate("comments.postedBy", "_id name image")
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body._id,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body._id,
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

export const addComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: { text: comment, postedBy: req.user._id } },
      },
      { new: true }
    )
      .populate("postedBy", "_id name image")
      .populate("comments.postedBy", "_id name image");
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

export const removeComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { comments: { _id: comment._id } },
      },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

export const publicFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "_id name image")
      .sort({ createdAt: -1 })
      .limit(10);
    // console.log('posts',posts)
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};

export const getPosts = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "-password -secret"
    );
    
    

    const posts = await Post.find({ postedBy: user })
   
    .populate("postedBy", "_id name image")
    .populate("comments.postedBy", "_id name image")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};

export const getPersonalPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);


    const posts = await Post.find({ postedBy: user })
    .populate("postedBy", "_id name image")
    .populate("comments.postedBy", "_id name image")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};


