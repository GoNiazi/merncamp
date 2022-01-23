import React, { useContext, useState } from "react";
import { Avatar, List, Skeleton } from "antd";
import { useRouter } from "next/router";
import moment from "moment";
import { UserContext } from "../../context";
import { imagesrc } from "../functions/index";
import Link from "next/link";

const PeopleList = ({ people, loading, handleFollow, handleUnfollow }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();
  const imagesrc = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "/images/logo.png";
    }
  };
  return (
    <>
      <List
        itemLayout="horizental"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <Skeleton loading={loading} active avatar>
              <List.Item.Meta
                avatar={<Avatar src={imagesrc(user)} />}
                title={
                  <div className="d-flex justify-content-between">
                    <Link href={`/user/${user.username}`}>
                      <a>
                        <span className="mt-1">{user.username} </span>
                      </a>
                    </Link>

                    {state &&
                    state.user &&
                    state.user.following.includes(user._id) ? (
                      <span
                        className="text-primary pointer"
                        onClick={() => handleUnfollow(user)}
                      >
                        UnFollow
                      </span>
                    ) : (
                      <span
                        className="text-primary pointer"
                        onClick={() => handleFollow(user)}
                      >
                        Follow
                      </span>
                    )}
                  </div>
                }
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};

export default PeopleList;
