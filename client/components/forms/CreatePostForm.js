import React from "react";
import { Avatar } from "antd";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreatePostForm = ({ content, setcontent, postSubmit }) => {
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
          />
        </form>
      </div>
      <div className="card-footer">
        <button
          disabled={!content}
          onClick={postSubmit}
          className="btn btn-primary mt-1"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePostForm;
