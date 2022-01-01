import React, { useContext, useState } from "react";
import { Avatar, List, Skeleton } from "antd";
import { useRouter } from "next/router";
import moment from "moment";
import { UserContext } from "../../context";
import { imagesrc } from "../functions/index";

const PeopleList = ({ people, loading, handleFollow }) => {
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
                    {user.username}{" "}
                    <span
                      className="text-primary pointer"
                      onClick={() => handleFollow(user)}
                    >
                      Follow
                    </span>
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
