import { toast } from "react-toastify";
import defaultAvatar from "../../assets/icons/defaultavatar.svg";
import CustomButton from "../CustomButton";
import { getButtonProperties } from "../Users/UsersGetButtonProperties";
import { getNotificationMessage } from "./getNotificationMessage";
import useFollowUnfollow from "../Users/useFollowUnfollow";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import timeTranslate from "../../utilities/timeTranslationFunction";
import { acceptFollow } from "./follow-requests/acceptFollow";
import { rejectFollow } from "./follow-requests/rejectFollow";
import { TFollowStatus } from "./backendInterface";

export interface NotificationComponentprops {
  actor?: string;
  userId?: string;
  followingStatus: TFollowStatus;
  followedStatus:TFollowStatus ;
  actionDate: string;
  avatar?: string;
  notifType:
    | "mention"
    | "comment"
    | "likePost"
    | "acceptFollow"
    | "requestFollow"
    | "reject"
    | "followedYou"
    | "followedOthers";
  receiver?: string;
  comment?: string;
  seen: boolean;
}

const MyNotificationComponent = ({
  actor,
  avatar,
  followingStatus,
  followedStatus,
  actionDate,
  notifType,
  receiver,
  comment,
  seen,
  userId,
}: NotificationComponentprops) => {
  const token: string = localStorage.getItem("token") ?? "";
  const queryClient = useQueryClient();
  const { followRefetch, unfollowRefetch } = useFollowUnfollow(
    token,
    userId as string,
  );
  const {
    data: acceptData,
    isError: acceptError,
    isFetching: acceptFetching,
    refetch: acceptRefetch,
  } = useQuery({
    queryKey: ["acceptUser", userId],
    queryFn: () => acceptFollow(token || "", userId as string),
    enabled: false,
  });
  const {
    data: rejectData,
    isError: rejectError,
    isFetching: rejectFetching,
    refetch: rejectRefetch,
  } = useQuery({
    queryKey: ["rejectUser", userId],
    queryFn: () => rejectFollow(token || "", userId as string),
    enabled: false,
  });
  const handleAcceptButtonClicked = async () => {
    await acceptRefetch();
    queryClient.invalidateQueries({
      queryKey: ["friendsNotifications", token],
    });
    queryClient.invalidateQueries({
      queryKey: ["personalNotifications", token],
    });
  };
  const handleRejectButtonClicked = async () => {
    await rejectRefetch();
    queryClient.invalidateQueries({
      queryKey: ["friendsNotifications", token],
    });
    queryClient.invalidateQueries({
      queryKey: ["personalNotifications", token],
    });
  };

  const handleFollowButtonClicked = async () => {
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
      queryClient.invalidateQueries({
        queryKey: ["friendsNotifications", token],
      });
      queryClient.invalidateQueries({
        queryKey: ["personalNotifications", token],
      });
    } else {
      await followRefetch();
      queryClient.invalidateQueries({
        queryKey: ["friendsNotifications", token],
      });
      queryClient.invalidateQueries({
        queryKey: ["personalNotifications", token],
      });
    }
  };
  const { text, className } = getButtonProperties(
    followingStatus,
    followedStatus,
  );
  return (
    <div
      className={`${seen ? "border-none bg-grey-100" : "border-grey-700 bg-lavender"} my-4 py-6 flex h-[64px] items-center justify-between gap-[93px] rounded-full border-b`}
      dir="rtl"
    >
      <div className="flex items-center gap-[27px] py-6">
        <img
          src={avatar ? avatar : defaultAvatar}
          alt="avatar"
          className="aspect-square h-[64px] w-[64px] rounded-full object-cover"
        />
        <div>
          <div className="font-isf text-[13px] font-bold leading-[21.48px] text-green-400">
            {getNotificationMessage(notifType, actor, receiver)}
          </div>
          {notifType === "comment" && (
            <>
              <div
                className="line-clamp-1 pt-1 font-isf text-[11px] font-normal leading-[14.3px] text-green-400"
                dir="rtl"
              >
                {comment}
              </div>
            </>
          )}
          <div
            className="pt-2 font-isf text-[11px] font-normal leading-[14.3px] text-green-400"
            dir="rtl"
          >
            {timeTranslate(actionDate)}
          </div>
        </div>
        {(notifType === "followedYou" || notifType === "followedOthers") && (
          <CustomButton
            text={text}
            className={className}
            handleOnClick={handleFollowButtonClicked}
          ></CustomButton>
        )}

        {notifType === "requestFollow" && followedStatus === "Pending" && (
          <>
            <CustomButton
              text="قبولههه"
              className="bg-red-200"
              handleOnClick={handleAcceptButtonClicked}
            ></CustomButton>
            <CustomButton
              text="خوشم نمیاد ازش"
              className="border border-red-200 !text-red-200"
              handleOnClick={handleRejectButtonClicked}
            ></CustomButton>
          </>
        )}
      </div>
    </div>
  );
};

export default MyNotificationComponent;
