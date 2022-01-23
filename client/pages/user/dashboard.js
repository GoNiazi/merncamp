import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context";
// import "bootstrap/dist/css/bootstrap.min.css";
import UserRouter from "../../components/routes/UserRouter";
import PostForm from "../../components/forms/PostForm";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import PostList from "../../components/cards/PostList";
import PeopleList from "../../components/cards/PeopleList";
import Link from "next/link";
import { Modal, Pagination } from "antd";
import Search from "../../components/Search";

const dashboard = () => {
  const [state, setstate] = useContext(UserContext);
  const [image, setimage] = useState({});
  const [uploading, setuploading] = useState(false);
  const [posts, setposts] = useState([]);
  const [loading, setloading] = useState(false);
  const [comment, setcomment] = useState("");
  const [currentpost, setcurrentpost] = useState({});
  const [visible, setvisible] = useState(false);
  //people
  const [people, setpeople] = useState([]);
  //pagination
  const [totalpost, settotalpost] = useState(0);
  const [page, setpage] = useState(1);
  //content
  const [content, setcontent] = useState("");
  //route
  const router = useRouter();
  useEffect(() => {
    if (state && state.token) {
      newsfeed();
      fetchpeople();
    }
  }, [state && state.token, page]);

  useEffect(() => {
    try {
      axios.get("/total-posts").then(({ data }) => settotalpost(data));

      settotalpost(data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const newsfeed = async () => {
    try {
      const { data } = await axios.get(`/newsfeed/${page}`);
      setposts(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchpeople = async () => {
    setloading(true);
    try {
      const { data } = await axios.get("/find-people");
      setpeople(data);
      setloading(false);
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
        setpage(1);
        newsfeed();
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
      newsfeed();
    } catch (error) {
      console.log(error);
    }
  };
  const handleFollow = async (user) => {
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id });
      //user upadte in local storage except token
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      //update user context
      setstate({ ...state, user: data });
      //filtering the list
      let filtered = people.filter((p) => p._id !== user._id);
      setpeople(filtered);
      toast.success(`Following ${user.name}`);
      newsfeed();
    } catch (error) {
      console.log(error);
    }
  };
  const handlelike = async (_id) => {
    console.log("hello in like");
    try {
      console.log("hello inn like");
      const { data } = await axios.put("/post-like", { _id });
      console.log(data);
      newsfeed();
    } catch (error) {
      console.log(error);
    }
  };
  const handleunlike = async (_id) => {
    console.log("hello in unlike");
    try {
      const { data } = await axios.put("/post-unlike", { _id });
      console.log(data);
      newsfeed();
    } catch (error) {
      console.log(error);
    }
  };
  const handlecomment = (post) => {
    setcurrentpost(post);
    setvisible(true);
  };

  const addcomment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/add-comment", {
        postid: currentpost._id,
        comment,
      });
      console.log(data);
      setcomment("");
      setvisible(false);
      newsfeed();
    } catch (error) {
      console.log(error);
    }
  };
  const removecomment = async (postid, comment) => {
    let answer = window.confirm("Are you sure?");
    if (!answer) return;
    try {
      const { data } = await axios.put("/remove-comment", { postid, comment });
      newsfeed();
      console.log(data);
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
            <PostList
              key={posts._id}
              posts={posts}
              handleDelete={handleDelete}
              handlelike={handlelike}
              handleunlike={handleunlike}
              handlecomment={handlecomment}
              removecomment={removecomment}
            />
            <Pagination
              current={page}
              total={(totalpost / 3) * 10}
              onChange={(value) => setpage(value)}
              className="pb-5"
            />
          </div>
          {/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}

          <div className="col-md-4">
            <Search />
            <br />
            {state &&
              state.user &&
              state.user.following &&
              state.user.followers && (
                <>
                  <Link href="/user/following">
                    <a className="h6">
                      {state.user.following.length} Following
                    </a>
                  </Link>
                  <Link href="/user/followers">
                    <a className="h6" style={{ marginLeft: "2rem" }}>
                      {state.user.followers.length}
                      {state.user.followers.length === 1
                        ? " Follower"
                        : " Followers"}
                    </a>
                  </Link>
                </>
              )}
            <p className="d-flex justify-content-center suggestions">
              People You May Know
            </p>
            <PeopleList
              people={people}
              loading={loading}
              handleFollow={handleFollow}
            />
          </div>
        </div>
        <Modal
          title="Comment"
          visible={visible}
          onCancel={() => setvisible(false)}
          footer={null}
        >
          <form onSubmit={addcomment}>
            <input
              type="text"
              className="form-control"
              placeholder="Write something"
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
            />
            <button className="btn btn-primary btn-sm btn-block mt-3">
              Submit
            </button>
          </form>
        </Modal>
      </div>
    </UserRouter>
  );
};

export default dashboard;
