import { useQuery } from "@tanstack/react-query";
import React from "react";
import { followUser } from "./followUser";
import { unfollowUser } from "./unfollowUser";

export default function useFollowUnfollow(
  token: string | null,
  userId: string | null,
) {
  const {
    data: followData,
    isError: followError,
    isFetching: followFetching,
    refetch: followRefetch,
  } = useQuery({
    queryKey: ["followUser", userId],
    queryFn: () => followUser(token || "", userId as string),
    enabled: false,
  });
  const {
    data: unfollowData,
    isError: unfollowError,
    error: unfollowErrorMsg,
    isFetching: unfollowFetching,
    refetch: unfollowRefetch,
  } = useQuery({
    queryKey: ["unfollowUser", userId],
    queryFn: () => unfollowUser(token || "", userId as string),
    enabled: false,
  });

  return {
    followData,
    followError,
    followFetching,
    followRefetch,
    unfollowData,
    unfollowError,
    unfollowFetching,
    unfollowRefetch,
  };
}
