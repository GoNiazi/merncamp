import { useState, useContext } from "react";
import { UserContext } from "../context/index";
import axios from "axios";
import PeopleList from "../components/cards/PeopleList";
import { toast } from "react-toastify";
const Search = () => {
  const [state, setstate] = useContext(UserContext);
  const [query, setquery] = useState("");
  const [result, setresult] = useState([]);

  const searchuser = async (e) => {
    e.preventDefault();
    try {
      console.log(" im going");
      const { data } = await axios.get(`/search-user/${query}`);
      setresult(data);
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
      let filtered = result.filter((p) => p._id !== user._id);
      setresult(filtered);
      toast.success(`Following ${user.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async (user) => {
    try {
      console.log("im up");
      const { data } = await axios.put("/user-unfollowing", { _id: user._id });
      //update local storage
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      //update context with latest user;
      setstate({ ...state, user: data });
      //filetering
      let filtered = result.filter((p) => p._id !== user._id);
      setresult(filtered);
      toast.error(`Unfollowed ${user.name}`);
      console.log("im don");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="form-inline row" onSubmit={searchuser}>
        <div className="col-8">
          <input
            className="form-control"
            placeholder="Search User"
            value={query}
            onChange={(e) => {
              setquery(e.target.value);
              setresult([]);
            }}
          />
        </div>

        <div className="col-4">
          <button className="btn btn-outline-primary col-12 ">Search</button>
        </div>
      </form>
      {result &&
        result.map((r) => (
          <PeopleList
            key={r._id}
            people={result}
            handleFollow={handleFollow}
            handleUnfollow={handleUnfollow}
          />
        ))}
    </div>
  );
};

export default Search;
