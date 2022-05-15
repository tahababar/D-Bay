import axios from "axios";
import {useState, useContext, useEffect} from "react";
//imported axios
import {toast} from "react-toastify";
import {Modal} from "antd";
import Link from 'next/link';
import AuthForm from '../../../components/forms/AuthForm';
import {UserContext} from "../../../context"
import { useRouter } from "next/router";
import CommentForm from "../../../components/forms/CommentForm";
import PostList from "../../../components/cards/PostList";
import UserRoute from "../../../components/routes/UserRoute";

const ProfileUpdate = () => {
    const [username, setUsername] =useState("");
    const [about, setAbout] =useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secret, setSecret] = useState("");
    const [ok, setOk] = useState(false);
    const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [posts, setPosts] = useState([]);

    const [state, setState] = useContext(UserContext);
    const router = useRouter();

    useEffect(()=>{
        if(state && state.user){
            setUsername(state.user.username);
            setAbout(state.user.about);
            setName(state.user.name);
            setEmail(state.user.email);
            fetchUserPosts();
        }
    }, [state && state.user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(name,email,password,secret);
    try{
        const {data} = await axios.put(`${process.env.NEXT_PUBLIC_API}/profile-update`, {
            username:username,
            about: about,
            name: name,
            email: email,
            password: password,
            secret: secret
        });
        if(data.error){
            toast.error(data.error)
        }else{
        //setName('')
        //setEmail('')
        //setPassword('')
        //setSecret('') //to empty text box fields after successful login

        //update local storage, update user, keep token
        let auth = JSON.parse(localStorage.getItem("auth"))
        auth.user = data;
        localStorage.setItem("auth", JSON.stringify(auth));
        //update context
        setState({...state, user:data});
        //successful trigger for toast success message
        setOk(true);

        } //if successful login, backend will send json data.ok and so setok will be true to sucessfully register user
    } catch (err) {
       toast.error(err.response.data); //e.g. name is required message //toast.error will display red box message
    }
};





  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get("/user-personal-posts");
      // console.log("user posts => ", data);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  

  

  

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


    return(
        <UserRoute>
        <div className="container-fluid">
        <div className = "row py-5 bg-warning text-light">
            <div className = "col text-center text-dark">
                <h1>Update Profile</h1>
            </div>
        </div>
    
    <div className="row py-5">
        <div className="col-md-6 offset-md-3">
            <AuthForm 
                ProfileUpdate={true}
                username={username}
                setUsername={setUsername}
                about={about}
                setAbout= {setAbout}
                handleSubmit = {handleSubmit}
                name = {name}
                setName = {setName}
                email = {email}
                setEmail = {setEmail}
                password = {password}
                setPassword = {setPassword}
                secret = {secret}
                setSecret = {setSecret}
            />
            <br></br>
            <br></br>
            <br></br>
            <PostList posts={posts} handleDelete={handleDelete} handleLike = {handleLike} handleUnlike = {handleUnlike} handleComment = {handleComment} removeComment = {removeComment}/>
        </div>
    </div>
    <div className="row">
        <div className="col">
            <Modal
                title = "Congratulations!"
                visible={ok}
                onCancel={() => setOk(false)}
                footer={null}
                >
                    <p>You have successfully updated your profile.</p>
                    
                </Modal>

        </div>
    </div>
    <Modal visible = {visible} onCancel={()=> setVisible(false)} title="Comment" footer={null} > 
            <CommentForm comment = {comment} setComment = {setComment} addComment = {addComment}/>
          </Modal>
           
            <br></br>
            <br></br>
</div>
</UserRoute>
    )
};
//{" "} added to add space between tags in <p>
export default ProfileUpdate;