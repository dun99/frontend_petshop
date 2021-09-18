import { Comment } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";

function CommentList(props) {
  const renderItem = (list) => {
    return list.map((comment, index) => {
      console.log(comment);
      return (
        <Comment
          author={<a>{props.user.email}</a>}
          content={comment.content}
          avatar={<Avatar src={props.user.avatar} alt="User" />}
        />
      );
    });
  };
  return <>{renderItem(props.comments)}</>;
}

export default CommentList;
