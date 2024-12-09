import { useEffect, useState } from "react";
import add from "../../assets/icons/add.svg";
import ModalTemplatePost from "../Posts/ModalTemplatePost";
import ToggleMenu from "../ToggleMenu";
import Dots from "../../assets/icons/Dots.svg";
import ModalTemplate from "../ModalTemplate";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FetchOthersProfile } from "./FetchOthersProfile";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BeatLoader, ClipLoader } from "react-spinners";
import ShowPostsComponent from "../Posts/ShowPostsComponent";
import { defaultProfile, userProfileAtom } from "../../user-actions/atoms";
import CustomButton from "../CustomButton";
import blockingIcon from "../../assets/icons/blockUser.svg";
import addToCloseFriendsIcon from "../../assets/icons/addToCloseFriends.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import MenuLiOptionComponent from "../MenuLiOptionComponent";
import verified from "../../assets/icons/_Verified.svg";
import { HandleError } from "./UserProfileErrorHandler";
import UsersCloseFriendModal from "./UsersModals/UsersCloseFriendModal";
import UsersUnCloseFriendModal from "./UsersModals/UsersUncloseFriendModal";
import UsersBlockModal from "./UsersModals/UsersBlockModal";
import UsersUnBlockModal from "./UsersModals/UsersUnBlockModal";
import FollowerListModalComponent from "../FollowerListModalComponent";
import FollowingListModalComponent from "../FollowingListModalComponent";
import { getButtonProperties } from "./UsersGetButtonProperties";
import useFollowUnfollow from "./useFollowUnfollow";
import defaultAvatar from "../../assets/icons/defaultavatar.svg"
export type FollowStatus =
| "Following"
| "NotFollowing"
| "Pending"
| "isBlocked"
| "Blocked";
export default function UsersProfilePageComponent() {
  const token: string = localStorage.getItem("token") ?? "";
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");
  const [userId, setUserId] = useState<string | null>(null);
  const [iconVisible, setIconVisible] = useState(true);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showUnBlockModal, setShowUnBlockModal] = useState(false);
  const [showCloseFriendModal, setShowCloseFriendModal] = useState(false);
  const [showUnCloseFriendModal, setShowUnCloseFriendModal] = useState(false);
  const [showFollowerList, setShowFollowerList] = useState(false);
  const [showFollowingList, setShowFollowingList] = useState(false);
  const [followingStatus, setFollowingStatus] =
    useState<FollowStatus>("NotFollowing");
  const [followedStatus, setFollowedStatus] =
    useState<FollowStatus>("NotFollowing");
  const queryClient = useQueryClient();
  const loggedUserData = useRecoilValue(userProfileAtom);
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);
  const [closeFriendStatus, setCloseFriendStatus] = useState(false);

  const navigate = useNavigate();
  //////////////////////////////////////////////////////////////////////////////////////////
  const {
    data: userData,
    isError: userError,
    isPending: userPending,
    error: userErrorMsg,
  } = useQuery({
    queryKey: ["othersProfile", username],
    queryFn: () => FetchOthersProfile(token , username as string),
    enabled: !!username,
  });
  
  useEffect(() => {
    if (userData && userData.data) {
      setUserId(userData.data.id);
      setFollowingStatus(userData.data.followingStatus);
      setFollowedStatus(userData.data.followedStatus);
      setCloseFriendStatus(userData.data.isCloseFriend);
      if (userData.data.username === loggedUserData.username) {
        navigate("/userprofile");
      }
    }
  }, [userData]);

  ////////////////////////////////////////////////////////////////////
  const handleShowFollowers = () => {
    setShowFollowerList((prevState) => !prevState);
    if (!showFollowerList) {
      queryClient.invalidateQueries({
        queryKey: ["followers", userProfile.id],
      });
    }
  };

  const handleShowFollowings = () => {
    setShowFollowingList((prevState) => !prevState);
    if (!showFollowingList) {
      queryClient.invalidateQueries({
        queryKey: ["followings", userProfile.id],
      });
    }
  };
  ////////////////////////////////////////////////////////////////
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
      queryClient.invalidateQueries({ queryKey: ["othersProfile", username] });
    } else {
      await followRefetch();
      queryClient.invalidateQueries({ queryKey: ["othersProfile", username] });
    }
  };
  /////////////////////////////////////////////////////////////////////////////////////
  const {
    followFetching,
    followRefetch,
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

  if (userPending) {
    return (
      <div className="mx-auto">
        <BeatLoader />
      </div>
    );
  }
  if (userError) {
    HandleError(userErrorMsg);
  }
  /////////////////////////////////////////////////////////////////////////////////////
  const { text, className } = getButtonProperties(
    followingStatus,
    followedStatus,
  );
  return (
    <div dir="rtl" className="md:px-16 max-sm:h-[530px] overflow-y-scroll">
      <div className="border-b border-grey-400 py-9 max-sm:ml-8 max-sm:mr-8">
        <div className="flex items-center justify-between space-x-4 max-sm:flex-col">
          <div className="flex w-full items-center gap-8">
            <div className="relative aspect-square h-[136px] rounded-full object-cover max-sm:h-[56px]  max-sm:self-baseline">
              <img
                src={
                  userData.data.avatar && userData.data.avatar.url
                    ? userData.data.avatar.url
                    : defaultProfile.avatar
                }
                alt="avatar"
                className="aspect-square h-[136px] w-[136px] rounded-full border-2 border-grey-400 object-cover max-sm:h-[56px] max-sm:w-[56px] max-sm:self-baseline"
              />

              {closeFriendStatus && (
                <img
                  src={verified}
                  alt="verified"
                  className="absolute bottom-2 left-4 h-[20px] w-[20px] max-sm:bottom-0 max-sm:left-0"
                />
              )}
            </div>

            <div className="ml-4 w-full">
              <p className="text-right text-sm text-golden" dir="ltr">
                {`@${userData?.data.username}`}
              </p>
              <div className="mt-4 flex items-center gap-x-3">
                {userData.data.firstName && userData.data.lastName && (
                  <h3 className="text-xl font-bold text-green-100">
                    {`${userData.data.firstName} ${userData.data.lastName}`}
                  </h3>
                )}

                <CustomButton
                  text={text}
                  iconsrc={iconVisible ? add : null}
                  className={className}
                  handleOnClick={handleButtonClicked}
                  size="small"
                >
                  {(followFetching || unfollowFetching) && (
                    <ClipLoader color="#9b9b9b" size={20} />
                  )}
                </CustomButton>
              </div>
              <div className="flex items-center justify-between">
                <div className="mt-4 flex gap-x-3 text-sm font-normal text-green-200">
                  <button
                    className="border-l pl-3"
                    onClick={handleShowFollowers}
                  >
                    {userData?.data.followersCount} دنبال کننده
                  </button>
                  <button
                    className="border-l pl-3"
                    onClick={handleShowFollowings}
                  >
                    {userData?.data.followingsCount} دنبال شونده
                  </button>
                  <span className="pl-3">{userData?.data.postsCount} پست</span>
                </div>
                <ToggleMenu imgSrc={Dots}>
                  <ul>
                    {closeFriendStatus ? (
                      <MenuLiOptionComponent
                        text="حذف از دوستان نزدیک"
                        iconsrc={addToCloseFriendsIcon}
                        handleOnClick={() => setShowUnCloseFriendModal(true)}
                      ></MenuLiOptionComponent>
                    ) : (
                      <MenuLiOptionComponent
                        text="افزودن به دوستان نزدیک"
                        iconsrc={addToCloseFriendsIcon}
                        handleOnClick={() => setShowCloseFriendModal(true)}
                      ></MenuLiOptionComponent>
                    )}

                    {followedStatus === "Blocked" ? (
                      <MenuLiOptionComponent
                        text="حذف از بلاک ها"
                        iconsrc={blockingIcon}
                        handleOnClick={() => setShowUnBlockModal(true)}
                      ></MenuLiOptionComponent>
                    ) : (
                      <MenuLiOptionComponent
                        text="بلاک کردن"
                        iconsrc={blockingIcon}
                        handleOnClick={() => setShowBlockModal(true)}
                      ></MenuLiOptionComponent>
                    )}
                  </ul>
                </ToggleMenu>
              </div>
              <p className="mt-4 text-sm text-grey-400 max-sm:justify-self-center">
                {userData?.data.bio}
              </p>
            </div>
          </div>

          {showCloseFriendModal && (
            <ModalTemplatePost
              showModal={showCloseFriendModal}
              onClose={() => setShowCloseFriendModal(false)}
            >
              <UsersCloseFriendModal
                username={userData.data.username}
                avatar = {userData.data.avatar?.url || defaultAvatar}
                followersCount={userData.data.followersCount} 
                userId={userId}
                followingStatus={followingStatus}
                followedStatus={followedStatus}
                onClick={() => setShowCloseFriendModal(false)}
              ></UsersCloseFriendModal>
            </ModalTemplatePost>
          )}

          {showUnCloseFriendModal && (
            <ModalTemplatePost
              showModal={showUnCloseFriendModal}
              onClose={() => setShowUnCloseFriendModal(false)}
            >
              <UsersUnCloseFriendModal
                username={userData.data.username}
                avatar = {userData.data.avatar?.url || defaultAvatar}
                followersCount={userData.data.followersCount} 
                userId={userId}
                followingStatus={followingStatus}
                followedStatus={followedStatus}
                onClick={() => setShowUnCloseFriendModal(false)}
              ></UsersUnCloseFriendModal>
            </ModalTemplatePost>
          )}

          {showBlockModal && (
            <ModalTemplatePost
              showModal={showBlockModal}
              onClose={() => setShowBlockModal(false)}
            >
              <UsersBlockModal
                username={userData.data.username}
                avatar = {userData.data.avatar?.url || defaultAvatar}
                followersCount={userData.data.followersCount} 
                userId={userId}
                onClick={() => setShowBlockModal(false)}
              ></UsersBlockModal>
            </ModalTemplatePost>
          )}

          {showUnBlockModal && (
            <ModalTemplatePost
              showModal={showUnBlockModal}
              onClose={() => setShowUnBlockModal(false)}
            >
              <UsersUnBlockModal
                username={userData.data.username}
                avatar = {userData.data.avatar?.url || defaultAvatar}
                followersCount={userData.data.followersCount} 
                userId={userId}
                onClick={() => setShowUnBlockModal(false)}
              ></UsersUnBlockModal>
            </ModalTemplatePost>
          )}
        </div>
      </div>
      {userData.data.isPrivate === true && followingStatus !== "Following" && (
        <div className="my-8 flex h-64 flex-grow flex-col items-center justify-center">
          <h3 className="py-8 text-center text-2xl">
            {`برای دیدن صفحه ${userData?.data.username} باید دنبالش کنی.`}
          </h3>
          <CustomButton
            text={text}
            iconsrc={iconVisible ? add : undefined}
            className={className}
            handleOnClick={handleButtonClicked}
            size="large"
          >
            {(followFetching || unfollowFetching) && (
              <ClipLoader color="#9b9b9b" size={20} />
            )}
          </CustomButton>
        </div>
      )}
      {userData.data.followingStatus === "Blocked" && (
        <div className="my-8 flex h-64 flex-grow flex-col items-center justify-center">
          <h3 className="py-8 text-center text-2xl">
            {` نمی تونی ${userData?.data.username}  رو دنبال کنی. چون اون نمیخواهد دوست تو باشه!`}
          </h3>
        </div>
      )}
      {userData.data.followedStatus === "Blocked" && (
        <div className="my-8 flex h-64 flex-grow flex-col items-center justify-center">
          <h3 className="py-8 text-center text-2xl">
            {` برای دیدن صفحه  ${userData?.data.username}  باید دنبالش کنی!`}
          </h3>
        </div>
      )}
      {userData?.data.username &&
        ((userData.data.isPrivate === false &&
          userData.data.followingStatus !== "Blocked" &&
          userData.data.followedStatus !== "Blocked") ||
          followingStatus === "Following") && (
          <ShowPostsComponent username={userData?.data.username} />
        )}

      {showFollowerList && (
        <ModalTemplate
          onClose={() => setShowFollowerList(false)}
          showModal={showFollowerList}
        >
          <FollowerListModalComponent
            userId={userData.data.id}
            token={token}
            onClick={() => setShowFollowerList(false)}
            FollowerListModal={showFollowerList}
          ></FollowerListModalComponent>
        </ModalTemplate>
      )}

      {showFollowingList && (
        <ModalTemplate
          onClose={() => setShowFollowingList(false)}
          showModal={showFollowingList}
        >
          <FollowingListModalComponent
            userId={userData.data.id}
            token={token}
            onClick={() => setShowFollowingList(false)}
            FollowingListModal={showFollowingList}
          ></FollowingListModalComponent>
        </ModalTemplate>
      )}
    </div>
  );
}
