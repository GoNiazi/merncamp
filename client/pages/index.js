import React, { useContext } from "react";

import ParallaxBG from "../components/cards/ParallaxBG";
import axios from "axios";
import PublicPost from "../components/cards/PublicPost";
import Head from "next/head";
import Link from "next/link";
const index = ({ posts }) => {
  const head = () => {};
  return (
    <>
      <ParallaxBG url="/images/cover.jpg">KELIUM</ParallaxBG>
      <div className="container-fluid">
        <div className="row pt-5">
          {posts.map((post) => {
            return (
              <div className="col-md-4">
                <Link href={`/post/view/${post._id}`}>
                  <a>
                    <PublicPost key={post._id} post={post} />
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <Head>
        <title>KELIUM-A social network website by devs for devs</title>
        <meta
          name="desciption"
          content="A social network website by devs for devs"
        />
        <meta
          property="og:description"
          content="A social network website by developer for developers"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="KELIUM" />
        <meta property="og:url" content="http://kelium.com" />
        <meta
          property="og:image:secure_url"
          content="http://kelium.com/images/cover.jpg"
        />
      </Head>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get("/posts");
  return {
    props: {
      posts: data,
    },
  };
}

export default index;
