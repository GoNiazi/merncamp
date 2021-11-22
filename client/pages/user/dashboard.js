import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context";
// import "bootstrap/dist/css/bootstrap.min.css";
import UserRouter from "../../components/routes/UserRouter";
import CreatePostForm from "../../components/forms/CreatePostForm";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import PostList from "../../components/cards/PostList";

const dashboard = () => {
  const [state, setstate] = useContext(UserContext);
  const [image, setimage] = useState({});
  const [uploading, setuploading] = useState(false);
  const [posts, setposts] = useState([]);
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

  return (
    <UserRouter>
      <div className="container-fluid ">
        <div className="row jkpy-5 text-light bg-default-img ">
          <div className="col text-center ">
            <h1>NewsFeed</h1>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-md-8 ">
            <CreatePostForm
              content={content}
              setcontent={setcontent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              image={image}
              uploading={uploading}
            />
            <br />
            <PostList posts={posts} />
          </div>
          {/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}
          <div className="col-md-4">sidebar</div>
        </div>
      </div>
    </UserRouter>
  );
};

export default dashboard;
