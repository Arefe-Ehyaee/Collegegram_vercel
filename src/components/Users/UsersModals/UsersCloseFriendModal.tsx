import { useEffect, useState } from "react";
import CustomButton from "../../CustomButton";
import ModalTemplatePost from "../../Posts/ModalTemplatePost";
import CloseFriendModal from "../../profile-page/closeFriend/CloseFriendModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CloseFriendAUser } from "../../profile-page/closeFriend/CloseFriendAUser";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

interface UsersCloseFriendModalProps {
  username: string;
  avatar: string;
  followersCount: number;
  userId: string | null;
  followingStatus?: string;
  followedStatus?: string;
  onClick: Function;
}

const UsersCloseFriendModal: React.FC<UsersCloseFriendModalProps> = ({
  username,
  avatar,
  followersCount, userId, followingStatus, followedStatus, onClick
}) => {

  const [CloseFriendModalState, setCloseFriendModalState] = useState(false);
  const queryClient = useQueryClient();
  const token: string = localStorage.getItem("token") ?? "";

  const {
    data: closeFriendData,
    isError: closeFriendError,
    isFetching: closeFriendFetching,
    refetch: closeFriendRefetch,
  } = useQuery({
    queryKey: ["closeFriendUser", userId],
    queryFn: () => CloseFriendAUser(token || "", userId as string),
    enabled: false,
  });

  // useEffect(() => {
  //   if (CloseFriendModalState) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "unset";
  //   }
  // }, [CloseFriendModalState]);

  // const handleCloseFriendModal = () => {
  //   setCloseFriendModalState((prevState) => !prevState);
  // };

  const handleCloseFriendAUser = async () => {
    if (followingStatus === "NotFollowing") {
      toast.warning("اول باید این کاربر رو دنبال کنی!");
    } else if (followedStatus === "NotFollowing") {
      toast.warning("این کاربر باید دنبالت کنه!");
    } else {
      try {
        await closeFriendRefetch();
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
    }
  };

  return (
    <div dir="rtl">
        <CloseFriendModal
          name={username}
          avatar={avatar}
          followersCount={followersCount}
        ></CloseFriendModal>
        <div className="mt-8 flex flex-row self-end">
          <CustomButton
            text="پشیمون شدم"
            className="ml-4 !text-black-100"
            handleOnClick={() => onClick()}
          ></CustomButton>
          <CustomButton
            text="آره حتما"
            className="bg-red-200"
            handleOnClick={handleCloseFriendAUser}
          >
            {closeFriendFetching && <ClipLoader color="#9b9b9b" size={20} />}
          </CustomButton>
        </div>
    </div>
  );
};

export default UsersCloseFriendModal;
