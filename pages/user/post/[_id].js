import { useRouter } from "next/router";
import {useEffect, useState} from 'react'
import axios from "axios"
import PostForm from "../../../components/forms/PostForm";
import UserRoute from "../../../components/routes/UserRoute";
import { toast } from "react-toastify";


const EditPost = () => {
    const router = useRouter()
    console.log("router", router)
    const _id = router.query._id
    const [post, setPost] = useState({});
    const [content, setContent] = useState("");
  const [contact, setContact] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
    useEffect(()=>{
        if(_id) fetchPost();
    },[_id]);

    const fetchPost = async() =>{
        try{
            const {data}  = await axios.get(`/user-post/${_id}`);
            setPost(data);
            setContent(data.content)
            setPrice(data.price)
            setContact(data.contact)
            setImage(data.image)
        }catch(err){
            console.log(err)
        }
    }

    const postSubmit = async(e) => {
        e.preventDefault()
        console.log("submit post to update", content, price, contact, image)
        try{
            const {data} = await axios.put(`/update-post/${_id}`,{content, price, contact, image})
            if(data.error){
                toast.error(data.error)
            }
            else{
                toast.success("Post Updated")
                router.push("/user/dashboard");
            }
        }catch (err){
            console.log(err)
        }
    }

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
    
    return(<UserRoute>
        <div className="container-fluid">
        <div className = "row py-5 bg-warning text-light">
              <div className = "col text-center text-dark">
                  <h1>News Feed</h1>
              </div>
          </div>
          
  
          <div className="row py-3">
            <div className="col-md-8 offset-md-2">
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
            </div>
          </div>
        </div>
      </UserRoute>)
};

export default EditPost;

//can be accessible as [_id] used in name of file