import { useEffect, useState } from "react";
import CustomButton from "../../CustomButton";
import ModalTemplatePost from "../../Posts/ModalTemplatePost";
import CloseFriendModal from "../../profile-page/closeFriend/CloseFriendModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CloseFriendAUser } from "../../profile-page/closeFriend/CloseFriendAUser";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { BlockAUser } from "../../profile-page/Blocking/BlockAUser";
import UnBlockingModal from "../../profile-page/Blocking/UnBlockingModal";
import { UnBlockAUser } from "../../profile-page/Blocking/UnBlockAUser";

interface UsersUnBlockModalProps {
  username: string;
  avatar: string;
  followersCount: number;
  userId: string | null;
  onClick: () => void;
}

const UsersUnBlockModal: React.FC<UsersUnBlockModalProps> = ({
  username,
  avatar,
  followersCount,
  userId,
  onClick,
}) => {
  const queryClient = useQueryClient();
  const token: string = localStorage.getItem("token") ?? "";

  const {
    data: unblockData,
    isError: unblockError,
    isFetching: unblockFetching,
    refetch: unblockRefetch,
  } = useQuery({
    queryKey: ["unblockUser", userId],
    queryFn: () => UnBlockAUser(token || "", userId as string),
    enabled: false,
  });

  const handleUnBlockAUser = async () => {
    try {
      await unblockRefetch();
      await queryClient.invalidateQueries({
        queryKey: ["othersProfile"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["CloseFriendList"],
      });
      await queryClient.invalidateQueries({queryKey: ["followers"]});
      await queryClient.invalidateQueries({queryKey: ["followings"]});
      await queryClient.invalidateQueries({queryKey: ["closeFriendList"]});
      await queryClient.invalidateQueries({queryKey: ["blackList"]});
    } finally {
      onClick();
    }
  };

  return (
    <div dir="rtl">
      <UnBlockingModal
        name={username}
        avatar={avatar}
        followersCount={followersCount}
      ></UnBlockingModal>
      <div className="mt-8 flex flex-row self-end">
        <CustomButton
          text="پشیمون شدم"
          className="ml-4 !text-black-100"
          handleOnClick={() => onClick()}
        ></CustomButton>
        <CustomButton
          text="آره حتما"
          className="bg-red-200"
          handleOnClick={handleUnBlockAUser}
        >
          {unblockFetching && <ClipLoader color="#9b9b9b" size={20} />}
        </CustomButton>
      </div>
    </div>
  );
};

export default UsersUnBlockModal;
