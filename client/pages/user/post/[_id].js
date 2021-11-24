import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import UserRouter from "../../../components/routes/UserRouter";
import PostForm from "../../../components/forms/PostForm";
import { toast } from "react-toastify";

const EditPost = () => {
  const router = useRouter();
  const _id = router.query._id;
  const [post, setpost] = useState({});
  const [image, setimage] = useState({});
  const [uploading, setuploading] = useState(false);
  const [content, setcontent] = useState("");

  useEffect(() => {
    if (_id) {
      fetchposts();
    }
  }, [_id]);

  const fetchposts = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setpost(data);
      setcontent(data.content);
      setimage(data.image);
    } catch (err) {
      console.log(err);
    }
  };
  const postSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(content);
      console.log(image);
      const { data } = await axios.put(`/update-post/${_id}`, {
        content,
        image,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Post Updated");
        router.push("/user/dashboard");
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
            <h1>Edit Post</h1>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-md-8 offset-md-2 ">
            <PostForm
              content={content}
              setcontent={setcontent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              image={image}
              uploading={uploading}
              page="edit"
            />
            <br />
          </div>
        </div>
      </div>
    </UserRouter>
  );
};

export default EditPost;
