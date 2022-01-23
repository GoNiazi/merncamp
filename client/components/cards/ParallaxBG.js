import React from "react";

const ParallaxBG = ({ url, children }) => {
  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: "url(" + url + ")",
        backgroundAttachement: "fixed",
        padding: "80px 0px 75px 0px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "100%",
        display: "block",
        textShadow: "2px 3px 3px #000",
      }}
    >
      <h1 className="display-1 font-weight-bold text-center">{children}</h1>
    </div>
  );
};

export default ParallaxBG;
