import { useEffect, useState } from "react";
import likeIcon from "./icons/exploreLike.svg";
import likeIconFilled from "./icons/exploreLikeFilled.svg";
import commentIcon from "./icons/exploreComment.svg";
import bookmarkIcon from "./icons/exploreBookmark.svg";
import bookmarkIconFilled from "./icons/exploreBookmarkFilled.svg";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { likePost } from "../Posts/likePost";
import { unlikePost } from "../Posts/unlikePost";
import { bookmarkPost } from "../Posts/bookmarkPost";
import { unbookmarkPost } from "../Posts/unbookmarkPost";

export interface PostInteractionsProps {
  likes: number;
  comments: number;
  bookmarks: number;
  id: string;
  isLiked: boolean;
  isBookmarked: boolean;
  closeFriendsOnly?: boolean
}

const PostCardInteractions = (props: PostInteractionsProps) => {
  const { comments, likes, bookmarks, id, isBookmarked, isLiked } = props;
  const token: string = localStorage.getItem("token") ?? "";
  const queryClient = useQueryClient();


  const {
    data: likeData,
    isError: likeError,
    error: likeErrorMsg,
    refetch: likeRefetch,
  } = useQuery({
    queryKey: ["likePost", id],
    queryFn: () => likePost(token , id as string),
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
    queryFn: () => unlikePost(token , id as string),
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
    queryFn: () => bookmarkPost(token , id as string),
    enabled: false,
  });
  const {
    data: unbookmarkData,
    isError: unbookmarkError,
    error: unbookmarkErrorMsg,
    refetch: unbookmarkRefetch,
  } = useQuery({
    queryKey: ["unbookmarkPost", id],
    queryFn: () => unbookmarkPost(token , id as string),
    enabled: false,
  });

  const handleLikeClick = async () => {
    if (!isLiked) {
      await likeRefetch();
      queryClient.invalidateQueries({ queryKey: ["explore", token] });
    } else {
      await unlikeRefetch();
      queryClient.invalidateQueries({ queryKey: ["explore", token] });
    }
  };
  const handleBookmarkeClick = async () => {
    if (!isBookmarked) {
      await bookmarkRefetch();
      queryClient.invalidateQueries({ queryKey: ["explore", token] });
    } else {
      await unbookmarkRefetch();
      queryClient.invalidateQueries({ queryKey: ["explore", token] });
    }
  };
  return (
    <div
      dir="rtl"
      className="flex h-[53px] w-full flex-row items-center gap-x-3 pr-2 md:pr-6 md:gap-x-4 text-sm text-black-200"
    >
      <button className="flex flex-row items-center justify-between gap-x-2">
        <img src={commentIcon} alt="comment button" />
        <p className="">{comments}</p>
      </button>
      <button
        onClick={handleLikeClick}
        className="flex flex-row items-center justify-between gap-x-2"
      >
        <img src={isLiked ? likeIconFilled : likeIcon} alt="like button" />
        <p className="">{likes}</p>
      </button>
      <button
        onClick={handleBookmarkeClick}
        className="flex flex-row items-center justify-between gap-x-2"
      >
        <img src={isBookmarked ? bookmarkIconFilled : bookmarkIcon} alt="" />
        <p className="">{bookmarks}</p>
      </button>
    </div>
  );
};

export default PostCardInteractions;
