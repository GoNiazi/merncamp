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
import Link from "next/link";

const Post = ({
  post,
  handleDelete,
  handleunlike,
  handlelike,
  handlecomment,
  commentscount = 10,
  removecomment,
}) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      {post && post.postedBy && (
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
              {state &&
              state.user &&
              post &&
              post.likes &&
              post.likes.includes(state.user._id) ? (
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
              <CommentOutlined
                onClick={() => handlecomment(post)}
                className="text-danger pt-2 h5 px-2"
              />
              <div className="pt-2 pl-3" style={{ marginRight: "2rem" }}>
                <Link href={`/post/${post._id}`}>
                  <a>{post.comments.length} comments</a>
                </Link>
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
          {post.comments && post.comments.length > 0 && (
            <ul
              className="list-group"
              style={{ maxHeight: "130px", overflowY: "scroll" }}
            >
              {post.comments.slice(0, commentscount).map((c) => (
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div>
                      <Avatar
                        src={imagesrc(c.postedBy)}
                        size={20}
                        className="mt-1 mr-3"
                      />
                      &nbsp; <span>{c.postedBy.name}</span>
                    </div>
                    <div>{c.text}</div>
                  </div>
                  <div className="badge rounded-pill text-muted">
                    {moment(c.created).fromNow()}
                    {state && state.user && state.user._id === c.postedBy._id && (
                      <div className="ml-auto mt-1">
                        <DeleteOutlined
                          onClick={() => removecomment(post._id, c)}
                          className="text-danger pl-2"
                        />
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default Post;
