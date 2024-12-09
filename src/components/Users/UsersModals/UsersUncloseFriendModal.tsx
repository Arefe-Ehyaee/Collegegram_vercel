import { useEffect, useState } from "react";
import CustomButton from "../../CustomButton";
import ModalTemplatePost from "../../Posts/ModalTemplatePost";
import CloseFriendModal from "../../profile-page/closeFriend/CloseFriendModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CloseFriendAUser } from "../../profile-page/closeFriend/CloseFriendAUser";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { UnCloseFriendAUser } from "../../profile-page/closeFriend/UnCloseFriendAUser";
import UnCloseFriendModal from "../../profile-page/closeFriend/UnCloseFriendModal";

interface UsersCloseFriendModalProps {
  username: string;
  avatar: string;
  followersCount: number;
  userId: string | null;
  followingStatus?: string;
  followedStatus?: string;
  onClick: Function;
}

const UsersUnCloseFriendModal = ({
  username,
  avatar,
  followersCount,
  userId,
  followingStatus,
  followedStatus,
  onClick,
} : UsersCloseFriendModalProps) => {
  // const [UnCloseFriendModalState, setUnCloseFriendModalState] = useState(false);
  const queryClient = useQueryClient();
  const token: string = localStorage.getItem("token") ?? "";

  const {
    data: uncloseFriendData,
    isError: uncloseFriendError,
    isFetching: uncloseFriendFetching,
    refetch: uncloseFriendRefetch,
  } = useQuery({
    queryKey: ["unCloseFriendUser", userId],
    queryFn: () => UnCloseFriendAUser(token || "", userId as string),
    enabled: false,
  });

  // useEffect(() => {
  //   if (UnCloseFriendModalState) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "unset";
  //   }
  // }, [UnCloseFriendModalState]);

  const handleUnCloseFriendAUser = async () => {
    try {
      await uncloseFriendRefetch();
      await queryClient.invalidateQueries({
        queryKey: ["othersProfile"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["CloseFriendList"],
      });
      await queryClient.invalidateQueries({queryKey: ["followers"]});
      await queryClient.invalidateQueries({queryKey: ["followings"]});
      await queryClient.invalidateQueries({queryKey: ["closeFriendList"]});
    } finally {
      onClick();
    }
  };

  return (
    <div dir="rtl">
      <UnCloseFriendModal
        name={username}
        avatar={avatar}
        followersCount={followersCount}
      ></UnCloseFriendModal>
      <div className="mt-8 flex flex-row self-end">
        <CustomButton
          text="پشیمون شدم"
          className="ml-4 !text-black-100"
          handleOnClick={() => onClick()}
        ></CustomButton>
        <CustomButton
          text="آره حتما"
          className="bg-red-200"
          handleOnClick={handleUnCloseFriendAUser}
        >
          {uncloseFriendFetching && <ClipLoader color="#9b9b9b" size={20} />}
        </CustomButton>
      </div>
    </div>
  );
};

export default UsersUnCloseFriendModal;
