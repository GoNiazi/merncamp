import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import Link from "next/link";
const useStyles = makeStyles((theme) => ({
  //   appbar: {
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
  //   login: {
  //     flexGrow: 1,
  //   },
  //   register: {
  //     flexGrow: 1,
  //   },
  active: {
    backgroundColor: "black",
  },
}));

const Nav = () => {
  const classes = useStyles();
  const [state, setstate] = useContext(UserContext);
  const router = useRouter();
  const [current, setcurrent] = useState("");

  useEffect(() => {
    process.browser && setcurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = () => {
    window.localStorage.removeItem("auth");
    setstate(null);
    router.push("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        // className={classes.appbar}
        // display="flex"
        // direction="row"
        // justifyContent="center"
        // alignItems="center"
      >
        <Toolbar
          className={classes.toolbar}
          // display="flex"
          // direction="row"
          // justifyContent="center"
          // alignItems="center"
          // spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <nav
            style={{
              height: "64px",

              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Link href="/" className={classes.height}>
              <Button
                color="inherit"
                variant="h6"
                className={current === "/" && classes.active}
                sx={{
                  minHeight: "100%",
                  margin: "0",
                }}
              >
                Home
              </Button>
            </Link>
            {state !== null ? (
              <>
                <Link href="/user/dashboard">
                  <Button
                    color="inherit"
                    variant="h6"
                    className={current === "/user/dashboard" && classes.active}
                    sx={{
                      minHeight: "100%",
                      margin: "0",
                    }}
                  >
                    {state.user.name}
                  </Button>
                </Link>
                <Button color="inherit" variant="h6">
                  <a onClick={logout}>Logout</a>
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className={classes.height}>
                  <Button
                    color="inherit"
                    variant="h6"
                    className={current === "/login" && classes.active}
                    sx={{
                      minHeight: "100%",
                      margin: "0",
                    }}
                  >
                    Login
                  </Button>
                </Link>

                <Link href="/register" className={classes.height}>
                  <Button
                    color="inherit"
                    variant="h6"
                    className={current === "/register" && classes.active}
                    sx={{
                      minHeight: "100%",
                      margin: "0",
                    }}
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
