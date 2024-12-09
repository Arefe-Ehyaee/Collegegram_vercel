import { useEffect, useState } from "react";
import likeIcon from "../../assets/icons/postLike.svg";
import likeIconFilled from "../../assets/icons/postLikeFilled.svg";
import commentIcon from "../../assets/icons/postComment.svg";
import bookmarkIcon from "../../assets/icons/postBookmark.svg";
import bookmarkIconFilled from "../../assets/icons/postBookmarkFilled.svg";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { likePost } from "./likePost";
import { unlikePost } from "./unlikePost";
import { bookmarkPost } from "./bookmarkPost";
import { unbookmarkPost } from "./unbookmarkPost";

interface PostInteractionsProps {
  likes: number;
  comments: number;
  bookmarks: number;
  id: string;
  isLiked: boolean;
  isBookmarked: boolean;
}

const PostInteractions = (props: PostInteractionsProps) => {
  const { bookmarks, comments, id, isBookmarked, isLiked, likes } = props;
  const token: string = localStorage.getItem("token") ?? "";
  const queryClient = useQueryClient();

  const {
    data: likeData,
    isError: likeError,
    error: likeErrorMsg,
    refetch: likeRefetch,
  } = useQuery({
    queryKey: ["likePost", id],
    queryFn: () => likePost(token, id as string),
    enabled: false,
  });
  const {
    data: unlikeData,
    isError: unlikeError,
    error: unlikeErrorMsg,
    isFetching: unlikeFetching,
    refetch: unlikeRefetch,
  } = useQuery({
    queryKey: ["unlikePost", id],
    queryFn: () => unlikePost(token, id as string),
    enabled: false,
  });
  const {
    data: bookmarkData,
    isError: bookmarkError,
    error: bookmarkErrorMsg,
    isFetching: bookmarkFetching,
    refetch: bookmarkRefetch,
  } = useQuery({
    queryKey: ["bookmarkPost", id],
    queryFn: () => bookmarkPost(token, id as string),
    enabled: false,
  });
  const {
    data: unbookmarkData,
    isError: unbookmarkError,
    error: unbookmarkErrorMsg,
    refetch: unbookmarkRefetch,
  } = useQuery({
    queryKey: ["unbookmarkPost", id],
    queryFn: () => unbookmarkPost(token, id as string),
    enabled: false,
  });

  const handleLikeClick = async () => {
    if (!isLiked) {
      await likeRefetch();
      queryClient.invalidateQueries({ queryKey: ["post"] });
    } else {
      await unlikeRefetch();
      queryClient.invalidateQueries({ queryKey: ["post"] });
    }
  };
  const handleBookmarkeClick = async () => {
    if (!isBookmarked) {
      await bookmarkRefetch();
      queryClient.invalidateQueries({ queryKey: ["post"] });
    } else {
      await unbookmarkRefetch();
      queryClient.invalidateQueries({ queryKey: ["post"] });
    }
  };
  return (
    <div
      dir="rtl"
      className="flex h-[61px] flex-row items-center gap-x-4 text-sm text-red-200"
    >
      <button className="flex flex-col items-center justify-between">
        <img src={commentIcon} alt="comment buton" />
        <p className="pt-1">{comments}</p>
      </button>
      <button
        onClick={handleLikeClick}
        className="flex flex-col items-center justify-between"
      >
        <img src={isLiked ? likeIconFilled : likeIcon} alt="like button" />
        <p className="pt-2">{likes}</p>
      </button>
      <button
        onClick={handleBookmarkeClick}
        className="flex flex-col items-center justify-between"
      >
        <img src={isBookmarked ? bookmarkIconFilled : bookmarkIcon} alt="" />
        <p className="pt-2">{bookmarks}</p>
      </button>
    </div>
  );
};

export default PostInteractions;
