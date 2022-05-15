
import { Avatar } from "antd";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PostForm = ({
  content,
              contact,
              price,
              setContent,
              setContact,
              setPrice,
              postSubmit,
              handleImage,
              uploading,
              image
}) => {
  return (
    <div className="card">
      <div className="card-body pb-3">
        <form className="form-group">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={(e) => setContent(e)}
            className="form-control"
            placeholder="Write something..."
          />
          <br />

<input 
type = "text"
value = {contact}
onChange = {(e) => setContact(e.target.value)}
className="form-control pb-1"
placeholder="Enter your contact info here!"
/>
<br />

<input
type = "text"
value = {price}
onChange = {(e) => setPrice(e.target.value)}
className="form-control pb-1"
placeholder="Enter your selling price here!"
/>
        </form>

      </div>

      <div className="card-footer d-flex justify-content-between text-muted">
        <button
          disabled={!content || !contact ||!price}
          onClick={postSubmit}
          className="btn btn-primary btn-sm mt-1"
        >
          Post
        </button>

        <label>
          {image && image.url ? (
            <Avatar size={30} src={image.url} className="mt-1" />
          ) : uploading ? (
            <LoadingOutlined className="mt-2" />
          ) : (
            <CameraOutlined className="mt-2" />
          )}
          <input onChange={handleImage} type="file" accept="images/*" hidden />
        </label>
      </div>
    </div>
  );
};

export default PostForm;





