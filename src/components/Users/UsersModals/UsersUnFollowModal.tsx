import { useEffect, useState } from "react";
import CustomButton from "../../CustomButton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { BlockAUser } from "../../profile-page/Blocking/BlockAUser";
import BlockingModal from "../../profile-page/Blocking/BlockingModal";
import UnFollowModal from "./UnfollowModal";
import useFollowUnfollow from "../useFollowUnfollow";

interface UsersBlockModalProps {
  username: string;
  avatar: string;
  followersCount: number;
  userId: string;
  onClick: () => void;
}

const UsersUnFollowModal = ({
  username,
  avatar,
  followersCount,
  userId,
  onClick,
}: UsersBlockModalProps) => {
  // const [blockModal, setBlockModal] = useState(false);
  const queryClient = useQueryClient();
  const token: string = localStorage.getItem("token") ?? "";
  
  const {
    followFetching,
    followRefetch,
    unfollowFetching,
    unfollowRefetch,
  } = useFollowUnfollow(token, userId);


  const handleUnFollowAUser = async () => {
    try {
      await unfollowRefetch();
    } finally {
      queryClient.invalidateQueries({
        queryKey: ["othersProfile", username],
      });
      queryClient.invalidateQueries({
        queryKey: ["followings", userId],
      });
      onClick();
    }
  };

  return (
    <div dir="rtl">
      <UnFollowModal
        name={username}
        avatar={avatar}
        followersCount={followersCount}
      ></UnFollowModal>
      <div className="mt-8 flex flex-row self-end">
        <CustomButton
          text="پشیمون شدم"
          className="ml-4 !text-black-100"
          handleOnClick={() => onClick()}
        ></CustomButton>
        <CustomButton
          text="آره حتما"
          className="bg-red-200"
          handleOnClick={handleUnFollowAUser}
        >
          {unfollowFetching && <ClipLoader color="#9b9b9b" size={20} />}
        </CustomButton>
      </div>
    </div>
  );
};

export default UsersUnFollowModal;
