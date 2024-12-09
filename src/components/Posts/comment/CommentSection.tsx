import { useState } from "react";
import ShowComment, { ShowCommentProps } from "./ShowComment";
import CommentingComponent, {
  CommentingComponentProps,
} from "./CommentingComponent";

export interface CommentSectionProps {
  showProps: ShowCommentProps[];
  commentingProps: CommentingComponentProps;
  id: string;
}

const CommentSection = (props: CommentSectionProps) => {
  const [commentUsername, setCommentUsername] = useState<string | null>(null);
  const [parentId, setParentId] = useState<string | null>(null);

  const handleReplyClick = (username: string | null, commentId: string) => {
    setCommentUsername((prevusername) =>
      prevusername === username ? null : username,
    );
    setParentId((prevParentId) =>
      prevParentId === commentId ? null : commentId,
    );
    console.log("props.id", props.showProps);
  };

  const { commentingProps, id, showProps } = props;
  return (
    <div className="flex flex-col justify-end px-4" dir="rtl">
      <CommentingComponent
        id={id}
        avatar={commentingProps.avatar}
        commnetUsername={commentUsername}
        parentId={parentId}
      />
      {showProps.map((comment: ShowCommentProps) => (
        <ShowComment
          // isLiked={comment.isLiked}
          key={comment.id}
          {...comment}
          onReplyClick={handleReplyClick}
        />
      ))}
    </div>
  );
};

export default CommentSection;
