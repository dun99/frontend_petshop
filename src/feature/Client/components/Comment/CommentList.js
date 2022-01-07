import { Comment } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";

function CommentList(props) {
  const renderItem = (list) => {
    return list.map((comment, index) => {
      console.log("comment", comment);
      return (
        <Comment
          author={<a>{comment.user.email}</a>}
          content={comment.content}
          avatar={<Avatar src={comment.user.avatar} alt="User" />}
        />
      );
    });
  };
  return <>{renderItem(props.comments)}</>;
}

export default CommentList;
