import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const router = useRouter();
  const [state, setstate] = useState({
    user: {},
    token: "",
  });
  useEffect(() => {
    setstate(JSON.parse(window.localStorage.getItem("auth")));
  }, []);

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        console.log(" im errir");
        setstate(null);
        window.localStorage.removeItem("auth");
        router.push("/login");
      }
    }
  );
  return (
    <UserContext.Provider value={[state, setstate]}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
