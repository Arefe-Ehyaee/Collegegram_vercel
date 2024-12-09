import { ClipLoader } from "react-spinners";
import CustomButton from "../../CustomButton";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  FollowStatus,
  getButtonProperties,
} from "../../Users/UsersGetButtonProperties";
import verified from "../../../assets/icons/_Verified.svg"
import useFollowUnfollow from "../../Users/useFollowUnfollow";
import add from "../../../assets/icons/add.svg";

interface SearchUsersCardProps {
  name: string;
  className?: string;
  avatar?: string;
  followersNumber: number;
  followingStatus: FollowStatus;
  followedStatus: FollowStatus;
  isCloseFriend: boolean;
  userId: string;
  onClick: () => void;
}

const token: string = localStorage.getItem("token") ?? "";

const SearchUsersCard = ({
  name,
  avatar,
  followersNumber,
  followingStatus,
  followedStatus,
  isCloseFriend,
  userId,
  onClick
}: SearchUsersCardProps) => {

  const [iconVisible, setIconVisible] = useState(true);

  const queryClient = useQueryClient();

  const {
    followData,
    followError,
    followFetching,
    followRefetch,
    unfollowData,
    unfollowError,
    unfollowFetching,
    unfollowRefetch,
  } = useFollowUnfollow(token, userId);

  useEffect(() => {
    if (followFetching || unfollowFetching) {
      setIconVisible(false);
    }
  }, [followFetching, unfollowFetching]);

  useEffect(() => {
    if (followingStatus !== "NotFollowing") {
      setIconVisible(false);
    }
  }, [followingStatus]);

  // if (userPending) {
  //   return (
  //     <div className="mx-auto">
  //       <BeatLoader />
  //     </div>
  //   );
  // }
  // if (userError) {
  //   HandleError(userErrorMsg);
  // }

  const handleButtonClicked = async () => {
    if (followingStatus === "Blocked") {
      toast.error("این کاربر بلاکت کرده، پس نمیتونی دنبالش کنی!");
      return;
    } else if (followedStatus === "Blocked") {
      toast.error("این کاربر رو بلاک کردی، پس نمیتونی دنبالش کنی!");
      return;
    } else if (
      followingStatus === "Following" ||
      followingStatus === "Pending"
    ) {
      await unfollowRefetch();
      queryClient.invalidateQueries({ queryKey: ["searchPeopleCard"] });
    } else {
      await followRefetch();
      queryClient.invalidateQueries({ queryKey: ["searchPeopleCard"] });
    }
  };

  const { text, className } = getButtonProperties(
    followingStatus,
    followedStatus,
  );

  return (
    <div
      className="h-[210px] max-w-[360px] rounded-[24px] border border-grey-700 bg-white p-8"
      dir="rtl"
    >
      <div>
        <div className="flex items-center gap-[27px] py-1">
          <div className="relative">
            <img
              src={avatar}
              alt="avatar"
              className="h-[56px] w-[56px] rounded-full border border-grey-400"
              onClick={onClick}
            />
            {isCloseFriend && (
              <img
                src={verified}
                alt="verified"
                className="absolute bottom-0 left-1 h-[20px] w-[20px]"
              />
            )}
          </div>

          <div>
            <div className="font-isf text-[13px] font-bold leading-[21.48px] text-green-400" onClick={onClick}>
              {name}
            </div>
            <div
              className="pt-2 font-isf text-[11px] font-normal leading-[14.3px] text-green-400"
              dir="rtl"
            >{` ${followersNumber} دنبال کننده `}</div>
          </div>
        </div>
        <div className="pt-8">

          <CustomButton
            text={text}
            iconsrc={iconVisible ? add : null}
            className={`w-full rounded-3xl justify-center ${className}`}
            handleOnClick={handleButtonClicked}
            size="small"
          >
            {/* {(followFetching || unfollowFetching) && (
                    <ClipLoader color="#9b9b9b" size={20} />
                  )} */}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default SearchUsersCard;
