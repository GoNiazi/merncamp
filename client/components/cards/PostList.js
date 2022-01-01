import React, { useContext } from "react";
import { Avatar } from "antd";
import moment from "moment";
import renderHtml from "react-render-html";
import PostImage from "../images/PostImage";
import { useRouter } from "next/router";
import {
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { UserContext } from "../../context";
import { imagesrc } from "../functions/index";

const PostList = ({ posts, handleDelete, handleunlike, handlelike }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();
  return (
    <>
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-5">
            <div className="card-header">
              {/* <Avatar size={40}>{post.postedBy.name[0]}</Avatar> */}
              <Avatar size={40} src={imagesrc(post.postedBy)} />
              <span style={{ marginLeft: "1rem" }}>{post.postedBy.name}</span>
              <span style={{ marginLeft: "1rem" }}>
                {moment(post.createdAt).fromNow()}
              </span>
            </div>
            <div className="card-body">{renderHtml(post.content)}</div>
            <div className="card-footer">
              {post.image && <PostImage url={post.image.url} />}
              <div className="d-flex pt-2">
                {post.likes.includes(state.user._id) ? (
                  <HeartFilled
                    onClick={() => handleunlike(post._id)}
                    className="text-danger pt-2 h5 px-2"
                  />
                ) : (
                  <HeartOutlined
                    onClick={() => handlelike(post._id)}
                    className="text-danger pt-2 h5 px-2"
                  />
                )}

                <div className="pt-2 pl-3" style={{ marginRight: "2rem" }}>
                  {post.likes.length} likes
                </div>
                <CommentOutlined className="text-danger pt-2 h5 px-2" />
                <div className="pt-2 pl-3" style={{ marginRight: "2rem" }}>
                  2 comments
                </div>
                {state && state.user && state.user._id === post.postedBy._id && (
                  <>
                    <EditOutlined
                      onClick={() => router.push(`/user/post/${post._id}`)}
                      className="text-danger pt-2 h5 px-2 mx-auto"
                    />
                    <DeleteOutlined
                      onClick={() => handleDelete(post)}
                      className="text-danger pt-2 h5 px-2 "
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default PostList;
