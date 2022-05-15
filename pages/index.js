//we will use next.js with react.. next.js helps with deployment 
//and with SEO 
//we created the npm package json file using npm init -y
//we downloaded npm packages: npm i next react-dom bootstrap
//we added start scripts in json package for next.js
//those start scripts like npm build etc will help with deployment
//it is necessary to have index.js in pages folder  for next.js to work

import { UserContext } from "../context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import PostImage from "../components/images/PostImage";
import { Avatar } from "antd";
import renderHTML from "react-render-html";
import moment from "moment";


const Home = () => {
    const [state, setState] = useContext(UserContext); //we import usercontext from context folder index.js file
    //imported useContext is a hook that takes the UserContext function as parameter and returns the stored context state to be used 
    const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPublicPosts();
  }, []);

  const fetchPublicPosts = async () => {
    try {
      const { data } = await axios.get("/public-posts");
      // console.log("user posts => ", data);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

    return( 
        <div className="container-fluid">
        <div className = "row py-5 bg-warning text-light">
        <div className = "col text-center text-dark">
            <h1>Home</h1>
        </div> 
    </div>

    <div className="row py-5">
        <div className="col-md-6 offset-md-3">
    <p className="text-center"><b>D-Bay</b> is a free web application where DePauw students and staff can sell and buy new or old resources from each other. Registered users can
                         follow each other and build their brand image by selling personal, curated or hand-made products to the campus community. 
                    </p>
                    <br></br>
                    <hr></hr>
                 
                    </div>
                    </div>
                    
         <>          
      {posts &&
        posts.map((post) => (
          <div key={post._id} className=" col-md-6 offset-md-3 card mb-5">
            <div className="card-header">
              <Avatar size={40}>{post && post.postedBy && post.postedBy.name && post.postedBy.name[0]}</Avatar>{" "}
              <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
                {post.postedBy.name}
              </span>
              <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
                {moment(post.createdAt).fromNow()}
              </span>
            </div>
            <div className="card-body">{renderHTML(post.content)} {renderHTML(post.price)} {renderHTML(post.contact)}</div>
            <div className="card-footer">
              {post.image && <PostImage url={post.image.url} />}
              </div>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
     
              </div>
        ))} 
              </> 
              <br></br>
              <br></br>
       
              
  </div>
         
    
    
    

   
   )};


export default Home;
//next recognizes public  folder so we dont need to use full source link in img tag like../../public/ etc///instead wee can just write /images/default.jpg
//now if we run npm run dev and it make a .next folder and run our react page
//we dont need to do any routing in terms of /login or /register
//next will automatically assign that reading our pages folder
//and we will be able to access pages by visiting urls like localhost3000/login