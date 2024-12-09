import { BeatLoader } from "react-spinners";
import CustomButton from "./CustomButton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FetchFollowers } from "./profile-page/FetchFollowers";
import { useInView } from "react-intersection-observer";
import { FetchFollowings } from "./profile-page/FetchFollowings";
import { useEffect } from "react";
import FollowerFollowing from "./FollowerFollowing";
import defaultAvatar from "../assets/icons/defaultavatar.svg";

interface FollowingListModalComponentProps {
  userId: string;
  token: string | null;
  onClick: () => void;
  FollowingListModal: Boolean;
  formOthersProfile?: boolean;
}

export interface Following {
  id: string;
  avatar: { url: string };
  username: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  followersCount: number;
  isCloseFriend: boolean;
}

const FollowingListModalComponent = ({
  userId,
  token,
  onClick,
  FollowingListModal,
  formOthersProfile
}: FollowingListModalComponentProps) => {
  const { ref: followingRef, inView: followingInView } = useInView();

  const {
    data: followingsData,
    fetchNextPage: fetchNextPageFollowing,
    hasNextPage: hasNextPageFollowing,
    isFetching: isFetchingFollowing,
    isError: isErrorFollowing,
    error: followingsError,
    refetch: refetchFollowing,
  } = useInfiniteQuery({
    queryKey: ["followings", userId],
    queryFn: async ({ pageParam = 1 }) =>
      FetchFollowings({ pageParam }, userId || "", token || ""),
    getNextPageParam: (lastPage) => {
      return lastPage?.data?.nextPage ?? undefined;
    },
    initialPageParam: 1,
    enabled: !!FollowingListModal && !!token,
  });

  useEffect(() => {
    if (followingInView && hasNextPageFollowing) {
      refetchFollowing();
    }
  }, [followingInView, hasNextPageFollowing, fetchNextPageFollowing]);

  return (
    <div dir="rtl">
      <div className="pb-8 text-center text-xl font-bold">دنبال کننده ها</div>
      {isFetchingFollowing && <BeatLoader />}
      <div className="max-h-[500px] min-h-[300px] overflow-y-scroll">
        {followingsData &&
          !isFetchingFollowing &&
          followingsData.pages.map((page) =>
            page.map((follower: Following) => (
              <FollowerFollowing
                id={follower.id}
                key={follower.id}
                name={follower.username}
                followersNumber={follower.followersCount}
                avatar={follower?.avatar?.url || defaultAvatar}
                isCloseFriend={follower.isCloseFriend}
                fromOthersProfile = {true}
              />
            )),
          )}
      </div>
      <div className="flex justify-center" ref={followingRef}></div>

      <div className="flex justify-center">
        <CustomButton
          text={"بستن"}
          className="mt-[34px] items-center justify-center bg-red-200"
          handleOnClick={() => onClick()}
        ></CustomButton>
      </div>
    </div>
  );
};

export default FollowingListModalComponent;
