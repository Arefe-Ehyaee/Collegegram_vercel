import FollowerFollowing from "../../FollowerFollowing";
import defaultAvatar from "../../../assets/icons/defaultavatar.svg";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GetCloseFriendList } from "./GetCloseFriendList";
import { useInView } from "react-intersection-observer";
import { BeatLoader } from "react-spinners";

export interface User {
  id: string;
  avatar: { url: string };
  username: string;
  firstname?: string;
  lastname?: string;
  postsCount: number;
  bio?: string;
  followersCount: number;
  followingsCount: number;
  isCloseFriend: boolean
}


export default function CloseFriendsPageComponent() {
  const token: string = localStorage.getItem("token") ?? "";
  const { ref, inView } = useInView();

  const {
    data: CloseFriendListData,
    fetchNextPage: fetchNextPageCloseFriendList,
    hasNextPage: hasNextPageCloseFriendList,
    isFetching: isFetchingCloseFriendList,
    isError: isErrorCloseFriendList,
    error: CloseFriendListError,
  } = useInfiniteQuery({
    queryKey: ["CloseFriendList", token],
    queryFn: async ({ pageParam = 1 }) =>
      GetCloseFriendList({ pageParam }, token ),
    getNextPageParam: (lastPage) => {
      return lastPage?.data?.nextPage ?? undefined;
    },
    initialPageParam: 1,
    enabled: !!token,
  });

  useEffect(() => {

    if (inView && hasNextPageCloseFriendList) {
      fetchNextPageCloseFriendList();
    }
  }, [inView, hasNextPageCloseFriendList, fetchNextPageCloseFriendList]);
  
  return (
    <div dir="rtl" className="px-[72px] max-sm:pr-2">
      <div className="mt-10 flex justify-start max-sm:justify-center">
        <NavLink to="/closeFriendsList">
          <h2 className="block px-7 font-isf text-xl max-sm:px-2">دوستان نزدیک</h2>
        </NavLink>

        <span>|</span>

        <NavLink to="/balckList">
          <h2 className="block px-7 font-isf text-xl text-grey-400 max-sm:px-2">لیست سیاه</h2>
        </NavLink>
      </div>

      <div className="w-[344px] pt-16">
        {CloseFriendListData &&
          CloseFriendListData?.pages.flatMap((page) =>
            page.data?.users.map((user: User) => (
              <FollowerFollowing
                id={user.id}
                key={user.id}
                name={user.username}
                followersNumber={user.followersCount}
                avatar={user?.avatar?.url || defaultAvatar}
                isCloseFriend={user.isCloseFriend}
                CloseBlackList = {"CloseFriendList"}
              />
            )),
          )}
        <div className="flex justify-center" ref={ref}>
          {isFetchingCloseFriendList && <BeatLoader />}
        </div>
      </div>
    </div>
  );
}
