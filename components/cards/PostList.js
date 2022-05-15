import { useContext } from "react";
import renderHTML from "react-render-html";
import moment from "moment";
import { Avatar } from "antd";
import PostImage from "../images/PostImage";
import {
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

const PostList = ({ posts, handleDelete, handleLike, handleUnlike, handleComment, removeComment }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();
  

 

  return (
    <>
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-5">
            <div className="card-header">
              <Avatar size={40}>{post.postedBy.name[0]}</Avatar>{" "}
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

              <div className="d-flex pt-2">
              {state && state.user && post.likes && post.likes.includes(state.user._id) ? (
                  <HeartFilled
                    onClick={() => handleUnlike(post._id)}
                    className="text-danger pt-2 h5 px-2"
                  />
                ) : (
                  <HeartOutlined
                    onClick={() => handleLike(post._id)}
                    className="text-danger pt-2 h5 px-2"
                  />
                )}

                <div className="pt-2 pl-3" style={{ marginRight: "1rem" }}>
                  {post.likes.length} likes
                </div>
                <CommentOutlined
                  onClick={() => handleComment(post)}
                  className="text-danger pt-2 h5 px-2"
                />
                <div className="pt-2 pl-3">{post.comments.length} comments</div>

                {state && state.user && state.user._id === post.postedBy._id && (
                  <>
                    <EditOutlined
                      onClick={() => router.push(`/user/post/${post._id}`)}
                      className="text-danger pt-2 h5 px-2 mx-auto"
                    />
                    <DeleteOutlined onClick={()=>handleDelete(post)}className="text-danger pt-2 h5 px-2" />
                  </>
                )}
              </div>
            </div>
            {post.comments &&  post.comments.length > 0 && (
              <ol className="list-group">
                {post.comments.map((c)=>  (
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div>
                      
                      <Avatar size={30} className  = "mb-1 mr-3">{c.postedBy.name[0]}</Avatar>
                      {" "}{c.postedBy.name}
                    </div>
                    <div>{c.text}</div>
                  </div>
                  <span className="badge rounded-pill text-muted">{moment(c.created).fromNow()}
                  {
                    state && state.user && state.user._id === c.postedBy._id &&
                    (
                      <div className="ml-auto mt-1">
                        <DeleteOutlined onClick={()=>removeComment(post._id,c)}className="pl-2 text-danger" />
                      </div>
                    )
                  }
                  </span>
                </li>
                ))}
              </ol>
            )}
          </div>
        ))}
    </>
  );
};

export default PostList;

































