import React, { useEffect, useState } from "react";
import replyButton from "../../../assets/icons/reply.svg";
import likeButton from "../../../assets/icons/commentHeart.svg";
import likeButtonActive from "../../../assets/icons/commentHeartActive.svg";
import timeTranslate from "../../../utilities/timeTranslationFunction";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { CommentLike } from "./CommentLike";
import { CommentUnLike } from "./CommentUnLike";

export interface ShowCommentProps {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  createdAt: string;
  description: string;
  parentId: string | null;
  postId: string;
  likeCommentsCount: number;
  replies?: ShowCommentProps[];
  user: User;
  isLiked: boolean;
  onReplyClick: (username: string | null, commentId: string) => void;
}

export interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
}

const ShowComment = (props: ShowCommentProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [isReplyClicked, setIsReplyClicked] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || " ");
  }, []);

  const {
    data: commnetlikeData,
    isError: commentlikeError,
    error: commentlikeErrorMsg,
    refetch: commentlikeRefetch,
  } = useQuery({
    queryKey: ["likeComment", props.id],
    queryFn: () => CommentLike(token || "", props.postId, props.id),
    enabled: false,
  });

  const {
    data: uncommnetlikeData,
    isError: uncommentlikeError,
    error: uncommentlikeErrorMsg,
    refetch: uncommentlikeRefetch,
  } = useQuery({
    queryKey: ["unlikeComment", props.id],
    queryFn: () => CommentUnLike(token || "", props.postId, props.id),
    enabled: false,
  });

  const handleLikeClick = async () => {
    if (!props.isLiked) {
      await commentlikeRefetch();
    } else {
      await uncommentlikeRefetch();
    }
    queryClient.invalidateQueries({
      queryKey: ["comments", token, props.postId],
    });
  };

  const handleReplyClick = () => {
    setIsReplyClicked((prevReply) => !prevReply);
    props.onReplyClick(props.user.username, props.id);
  };

  const commentStyle = props.parentId ? "mr-8 w-[90%]  " : "w-full";

  return (
    <div
      dir="rtl"
      className={`my-2 flex flex-col self-baseline ${commentStyle}`}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <p className="font-bold">{props.user.username}</p>
          <p className="pr-5 text-xs">{timeTranslate(props.createdAt)}</p>
        </div>
        <div className="flex flex-row items-center gap-4">
          <button
            onClick={handleLikeClick}
            className="flex flex-row items-center"
          >
            <p className="mx-2 text-sm leading-4 text-red-300">
              {props.likeCommentsCount}
            </p>
            <img
              src={props.isLiked ? likeButtonActive : likeButton}
              alt="like Button"
              className="h-[16px]"
            />
          </button>
          <button
            onClick={handleReplyClick}
            // className={`${isReplyClicked ? "rounded-md bg-grey-400 p-2" : ""}`}
          >
            <img src={replyButton} alt="reply button" className="h-[19px]" />
          </button>
        </div>
      </div>
      <p className="pt-2 leading-8 text-black-100">{props.description}</p>

      {props.replies && props.replies.length > 0 && (
        <div>
          {props.replies.map((reply) => (
            <ShowComment
              key={reply.id}
              {...reply}
              onReplyClick={props.onReplyClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowComment;
