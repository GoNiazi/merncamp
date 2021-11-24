import React from "react";
import { Avatar } from "antd";
import dynamic from "next/dynamic";
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const PostForm = ({
  content,
  setcontent,
  postSubmit,
  handleImage,
  image,
  uploading,
  page,
}) => {
  return (
    <div className="card">
      <div className="card-body pb-3">
        <form className="form-group">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={(e) => setcontent(e)}
            className="form-control "
            placeholder="Write something ....."
            style={{ fontSize: "20px" }}
          />
        </form>
      </div>
      <div className="card-footer d-flex justify-content-between text-muted">
        <button
          disabled={!content}
          onClick={postSubmit}
          className="btn btn-primary mt-1"
        >
          {page === "edit" ? "Update" : "Post"}
        </button>
        <label>
          {image && image.url ? (
            <Avatar size={40} src={image.url} className="mt-1" />
          ) : uploading ? (
            <LoadingOutlined className="mt-3" style={{ fontSize: "20px" }} />
          ) : (
            <CameraOutlined
              className="mt-3 "
              style={{ fontSize: "20px", cursor: "pointer" }}
            />
          )}

          <input onChange={handleImage} type="file" accpet="images/*" hidden />
        </label>
      </div>
    </div>
  );
};

export default PostForm;
