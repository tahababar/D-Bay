import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import PostForm from "../../components/forms/PostForm";
import { useRouter, userRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import PostList from "../../components/cards/PostList";
import People from "../../components/cards/People"
import Link from "next/link";
import { Modal } from "antd";
import CommentForm from "../../components/forms/CommentForm";
import Search from "../../components/Search";


const Home = () => {
  const [state, setState] = useContext(UserContext);
  // state
  const [content, setContent] = useState("");
  const [contact, setContact] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  // posts
  const [posts, setPosts] = useState([]);
  // people
  const [people, setPeople] = useState([]);
  // comments
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});


  // route
  const router = useRouter();

  useEffect(() => {
    if (state && state.token)
    fetchUserPosts();
    findPeople();
  }, [state && state.token]);



  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get("/user-posts");
      // console.log("user posts => ", data);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const findPeople = async () => {
    try{
      const { data } = await axios.get("/find-people");
      setPeople(data);
    }catch(err){
      console.log(err);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log("post => ", content);
    try {
      const { data } = await axios.post("/create-post", { content, image, price, contact });
      console.log("create post response => ", data);
      if (data.error) {
        toast.error(data.error);
      } else {
        fetchUserPosts();
        toast.success("Post created");
        setContent("");
        setImage({});
        setContact("");
        setPrice("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    // console.log([...formData]);
    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      // console.log("uploaded image => ", data);
      setImage({
        url: data.url,
        public_id: data.public_id
      });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };
  /*
<div className = "row py-5 bg-warning text-light">
            <div className = "col text-center text-dark">
                <h1>Login</h1>
            </div>
        </div>



  */

  const handleDelete = async (post) => {
    try{
      const answer = window.confirm("Are you sure?")
      if(!answer){
        return;
      }
      else{
        const { data } = await axios.delete(`/delete-post/${post._id}`);
        toast.error("Post Deleted")
        fetchUserPosts()
      }
    }catch(err){
      console.log(err)
    }
  }

  const handleFollow = async (user) => {
    // console.log("add this user to following list ", user);
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id });
      // console.log("handle follow response => ", data);
      // update local storage, update user, keep token
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      // update context
      setState({ ...state, user: data });
      // update people state
      let filtered = people.filter((p) => p._id !== user._id);
      setPeople(filtered);
      // rerender the posts in newsfeed
      fetchUserPosts();
      toast.success(`Following ${user.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async (_id) => {
    // console.log("like this post => ", _id);
    try {
      const { data } = await axios.put("/like-post", { _id });
      console.log("liked", data);
      fetchUserPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async (_id) => {
    // console.log("unlike this post => ", _id);
    try {
      const { data } = await axios.put("/unlike-post", { _id });
      console.log("unliked", data);
      fetchUserPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = (post) => {
    setCurrentPost(post);
    setVisible(true);
  };

  const addComment = async (e) => {
    e.preventDefault();
    // console.log("add comment to this post id", currentPost._id);
    // console.log("save comment to db", comment);
    try {
      const { data } = await axios.put("/add-comment", {
        postId: currentPost._id,
        comment,
      });
      console.log("add comment", data);
      setComment("");
      setVisible(false);
      fetchUserPosts();
    } catch (err) {
      console.log(err);
    }
  };

 
  const removeComment = async (postId, comment) => {
    let answer = window.confirm("Are you sure?")
    if(!answer){
      return;
    }
    try{
      const {data} = await axios.put('remove-comment', {
        postId,
        comment
      })
    fetchUserPosts();
    }catch(err){
      console.log(err)
    }
  }

  return (
    <UserRoute>
      <div className="container-fluid">
      <div className = "row py-5 bg-warning text-light">
            <div className = "col text-center text-dark">
                <h1>Dashboard</h1>
            </div>
        </div>
        

        <div className="row py-3">
          <div className="col-md-8">
            <PostForm
              content={content}
              contact={contact}
              price = {price}
              setContent={setContent}
              setContact = {setContact}
              setPrice = {setPrice}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
            <br />
            <PostList posts={posts} handleDelete={handleDelete} handleLike = {handleLike} handleUnlike = {handleUnlike} handleComment = {handleComment} removeComment = {removeComment}/>
           
          </div>

         
         <br></br>
         <br></br>
         <br></br>
         <br></br>
          <div className="col-md-3">
          <br></br>
           
            

            <p className="pt-2 text-secondary h6">Follow Users:</p>
            <br></br>
           
           
            
            <Search/>
            <br></br>
            <People people={people} handleFollow={handleFollow} />
            <br></br>
            {state && state.user && state.user.following && (
              
              <Link href={`/user/following`}>
                
                <a className="pt-5 text-primary h6"> Following: {state.user.following.length} users</a>
              </Link>
            )}
          </div>
  
        </div>
          <Modal visible = {visible} onCancel={()=> setVisible(false)} title="Comment" footer={null} > 
            <CommentForm comment = {comment} setComment = {setComment} addComment = {addComment}/>
          </Modal>


      </div>
    </UserRoute>
  );
};
//footer null in model to hide ok and cancel prebuilt buttons in model comment box
export default Home;






//npm i react-render-html moment --force


