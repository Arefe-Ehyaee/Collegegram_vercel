import { useEffect, useState } from "react";
import CustomButton from "../../CustomButton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { BlockAUser } from "../../profile-page/Blocking/BlockAUser";
import BlockingModal from "../../profile-page/Blocking/BlockingModal";
import UnFollowModal from "./UnfollowModal";
import useFollowUnfollow from "../useFollowUnfollow";
import RemoveFollowerModal from "./RemoveFollowerModal";
import { DeleteFromFollowers } from "../DeleteFromFollowers";

interface UsersRemoveFollowerModalProps {
  username: string;
  avatar: string;
  followersCount: number;
  userId: string;
  onClick: () => void;
}

const UsersRemoveFollowerModal = ({
  username,
  avatar,
  followersCount,
  userId,
  onClick,
}: UsersRemoveFollowerModalProps) => {
  const queryClient = useQueryClient();
  const token: string = localStorage.getItem("token") ?? "";

  const {
    data: removeFollowerData,
    isError: removeFollowerError,
    error: removeFollowerErrorMsg,
    refetch: removeFollowerRefetch,
    isFetching: removeFollowerFetching,
  } = useQuery({
    queryKey: ["deleteFollower", userId],
    queryFn: () => DeleteFromFollowers(token, userId),
    enabled: false,
  });

  const handleRemoveFollower = async () => {
    try {
      await removeFollowerRefetch();
      await queryClient.invalidateQueries({
        queryKey: ["othersProfile"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["CloseFriendList"],
      });
      await queryClient.invalidateQueries({queryKey: ["followers"]});
      await queryClient.invalidateQueries({queryKey: ["followings"]});
    } finally {
      onClick();
    }
  };

  return (
    <div dir="rtl">
      <RemoveFollowerModal
        name={username}
        avatar={avatar}
        followersCount={followersCount}
      ></RemoveFollowerModal>
      <div className="mt-8 flex flex-row self-end">
        <CustomButton
          text="پشیمون شدم"
          className="ml-4 !text-black-100"
          handleOnClick={() => onClick()}
        ></CustomButton>
        <CustomButton
          text="آره حتما"
          className="bg-red-200"
          handleOnClick={handleRemoveFollower}
        >
          {removeFollowerFetching && <ClipLoader color="#9b9b9b" size={20} />}
        </CustomButton>
      </div>
    </div>
  );
};

export default UsersRemoveFollowerModal;
