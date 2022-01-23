import React, { useContext } from "react";
import { UserContext } from "../../../context";
import ParallaxBG from "../../../components/cards/ParallaxBG";
import axios from "axios";
import PublicPost from "../../../components/cards/PublicPost";
import Head from "next/head";
import Link from "next/link";
const SingelPost = ({ post }) => {
  const imagesrc = (post) => {
    if (post.image) {
      return post.image.url;
    } else {
      return "/images/cover.jpg";
      // return {name[0]};
    }
  };

  return (
    <>
      <ParallaxBG url="/images/cover.jpg">KELIUM</ParallaxBG>
      <div className="container-fluid">
        <div className="row pt-5">
          <div className="col-md-8 offset-md-2">
            <PublicPost key={post._id} post={post} />
          </div>
        </div>
      </div>
      <Head>
        <title>KELIUM-A social network website by devs for devs</title>
        <meta name="desciption" content={post.content} />
        <meta
          property="og:description"
          content="A social network website by developer for developers"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="KELIUM" />
        <meta property="og:url" content={`/http://kelium.com/${post._id}`} />
        <meta property="og:image:secure_url" content={imagesrc(post)} />
      </Head>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { data } = await axios.get(`/post/${ctx.params._id}`);
  return {
    props: {
      post: data,
    },
  };
}

export default SingelPost;
