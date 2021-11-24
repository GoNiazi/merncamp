import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context";
// import "bootstrap/dist/css/bootstrap.min.css";
import UserRouter from "../../components/routes/UserRouter";
import PostForm from "../../components/forms/PostForm";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import PostList from "../../components/cards/PostList";
// import { Modal } from "antd";

const dashboard = () => {
  const [state, setstate] = useContext(UserContext);
  const [image, setimage] = useState({});
  const [uploading, setuploading] = useState(false);
  const [posts, setposts] = useState([]);
  // const [sure, setsure] = useState(false);

  //state
  const [content, setcontent] = useState("");
  //route
  const router = useRouter();
  useEffect(() => {
    if (state && state.token) {
      fetchposts();
    }
  }, [state && state.token]);
  const fetchposts = async () => {
    try {
      const { data } = await axios.get("/user-posts");
      setposts(data);
    } catch (error) {
      console.log(error);
    }
  };
  const postSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/create-post", { content, image });
      if (data.error) {
        toast.error(data.error);
      } else {
        fetchposts();
        toast.success("Post created");
        console.log(data);
        setcontent("");
        setimage({});
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleImage = async (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("image", file);
    setuploading(true);
    try {
      const { data } = await axios.post("/upload-image", formdata);
      setimage({
        url: data.url,
        public_id: data.public_id,
      });
      setuploading(false);
    } catch (error) {
      console.log(error);
      setuploading(false);
    }
  };
  const handleDelete = async (post) => {
    const answer = window.confirm("Are you sure?");
    if (!answer) return;
    try {
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      toast.error("Post Deleted");
      fetchposts();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UserRouter>
      <div className="container-fluid ">
        <div className="row py-5 text-light bg-default-img ">
          <div className="col text-center ">
            <h1>NewsFeed</h1>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-md-8 ">
            <PostForm
              content={content}
              setcontent={setcontent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              image={image}
              uploading={uploading}
            />
            <br />
            <PostList posts={posts} handleDelete={handleDelete} />
          </div>
          {/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}
          <div className="col-md-4">sidebar</div>
          {/* <div className="row">
            <div className="col">
              <Modal
                title={"Are you sure ?"}
                visible={sure}
                onCancel={() => setsure(false)}
                footer={null}
              >
                <button
                  className="btn btn-primary mt-1"
                  onClick={() => setsure(false)}
                >
                  OK
                </button>
              </Modal>
            </div>
          </div> */}
        </div>
      </div>
    </UserRouter>
  );
};

export default dashboard;
