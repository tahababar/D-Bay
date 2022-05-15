import { useContext, useState, useEffect } from "react";
import { Avatar, List, Card } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
import { toast } from "react-toastify";
const { Meta } = Card;
import PostList from "../../components/cards/PostList";
import CommentForm from "../../components/forms/CommentForm";
import { Modal } from "antd";
import UserRoute from "../../components/routes/UserRoute";

const Username = () => {
  const [state, setState] = useContext(UserContext);
  // state
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  
  // people

  // comments
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  
  const router = useRouter();

  useEffect(() => {
    if (router.query.username) 
    fetchUser();
    fetchPosts();
  }, [router.query.username]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/user/${router.query.username}`);
      //   console.log("router.query.username => ", data);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPosts = async () => {
    try {
        const { data } = await axios.get(`/post/${router.query.username}`);
        // console.log("user posts => ", data);
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
  }


  const handleLike = async (_id) => {
    // console.log("like this post => ", _id);
    try {
      const { data } = await axios.put("/like-post", { _id });
      console.log("liked", data);
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async (_id) => {
    // console.log("unlike this post => ", _id);
    try {
      const { data } = await axios.put("/unlike-post", { _id });
      console.log("unliked", data);
      fetchPosts();
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
      fetchPosts();
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
    fetchPosts();
    }catch(err){
      console.log(err)
    }
  }

  const handleDelete = async (post) => {
    try{
      const answer = window.confirm("Are you sure?")
      if(!answer){
        return;
      }
      else{
        const { data } = await axios.delete(`/delete-post/${post._id}`);
        toast.error("Post Deleted")
        fetchPosts()
      }
    }catch(err){
      console.log(err)
    }
  }


  
  return (
      <UserRoute>
    <div className="row col-md-6 offset-md-3">


      <div className="pt-5 pb-5">
        <Card hoverable>
          <Meta title={user.name} description={user.about} />

          <p className="pt-2 text-muted">
            Joined {moment(user.createdAt).fromNow()}
          </p>

          <div className="d-flex justify-content-between">
            <span className="btn btn-sm">
              {user.followers && user.followers.length} Followers
            </span>

            <span className="btn btn-sm">
              {user.following && user.following.length} Following
            </span>
          </div>
        </Card>

        <br></br>
        <br></br>

        <PostList posts={posts} handleDelete={handleDelete} handleLike = {handleLike} handleUnlike = {handleUnlike} handleComment = {handleComment} removeComment = {removeComment}/>

        <Link href="/user/dashboard">
          <a className="d-flex justify-content-center pt-5">
            <RollbackOutlined />
          </a>
        </Link>
      </div>
      <Modal visible = {visible} onCancel={()=> setVisible(false)} title="Comment" footer={null} > 
            <CommentForm comment = {comment} setComment = {setComment} addComment = {addComment}/>
          </Modal>
    </div>
    </UserRoute>
  );
};

export default Username;

