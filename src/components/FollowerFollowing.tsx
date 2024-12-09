import ToggleMenu from "./ToggleMenu";
import blockingIcon from "../assets/icons/blockUser.svg";
import addToCloseFriendsIcon from "../assets/icons/addToCloseFriends.svg";
import Dots from "../assets/icons/Dots.svg";
import { useEffect, useState } from "react";
import ModalTemplatePost from "./Posts/ModalTemplatePost";
import defaultAvatar from "../assets/icons/defaultavatar.svg";
import verified from "../assets/icons/_Verified.svg";
import MenuLiOptionComponent from "./MenuLiOptionComponent";
import UsersUnCloseFriendModal from "./Users/UsersModals/UsersUncloseFriendModal";
import UsersCloseFriendModal from "./Users/UsersModals/UsersCloseFriendModal";
import UsersBlockModal from "./Users/UsersModals/UsersBlockModal";
import UsersUnBlockModal from "./Users/UsersModals/UsersUnBlockModal";
import UsersUnFollowModal from "./Users/UsersModals/UsersUnFollowModal";
import Minus from "../assets/icons/Layer 1.svg";
import UsersRemoveFollowerModal from "./Users/UsersModals/UsersRemoveFollowerModal";
import { useNavigate } from "react-router-dom";


interface FollowerFollowingProps {
  name: string;
  followersNumber: number;
  avatar: string;
  isCloseFriend: boolean;
  id: string;
  FollowerFollowingList?: "FollowerList" | "FollowingList";
  CloseBlackList?: "CloseFriendList" | "BlackList";
  fromOthersProfile?: boolean;
}
export interface Follower {
  id: string;
  avatar: { url: string };
  username: string;
  first_name?: string;
  last_name?: string;
  postsCount: number;
  bio?: string;
  followersCount: number;
  followingsCount: number;
}

const FollowerFollowing = ({
  name,
  followersNumber,
  avatar,
  isCloseFriend,
  id,
  FollowerFollowingList,
  CloseBlackList,
  fromOthersProfile,
}: FollowerFollowingProps) => {
  const [BlockModal, setBlockModal] = useState(false);
  const [UnBlockModal, setUnBlockModal] = useState(false);
  const [CloseFriendModalState, setCloseFriendModalState] = useState(false);
  const [UnCloseFriendModalState, setUnCloseFriendModalState] = useState(false);
  const navigate = useNavigate();
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showUnBlockModal, setShowUnBlockModal] = useState(false);
  const [showCloseFriendModal, setShowCloseFriendModal] = useState(false);
  const [showUnCloseFriendModal, setShowUnCloseFriendModal] = useState(false);
  const [showUnFollowModal, setShowUnFollowModal] = useState(false);
  const [showRemoveFollowerModal, setShowRemoveFollowerModal] = useState(false);

  const token: string = localStorage.getItem("token") ?? "";

  useEffect(() => {
    if (BlockModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [BlockModal]);


  /////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (CloseFriendModalState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [CloseFriendModalState]);

  const handleShowUserProfile = (username: string) => {
    navigate(`/users/profile?username=${username}`);
  };

  return (
    <div
      className="flex items-center justify-between gap-[130px] border-b border-grey-700 py-4"
      dir="rtl"
    >
      <div className="flex items-center gap-[40px]">
        <div className="relative aspect-square h-14 rounded-full object-cover">
          <img
            src={avatar ? avatar : defaultAvatar}
            alt="avatar"
            className="aspect-square h-14 w-14 rounded-full object-cover"
          />
          {isCloseFriend && (
            <img
              src={verified}
              alt="verified"
              className="absolute bottom-0 left-0 h-[20px] w-[20px]"
            />
          )}
        </div>
        <div>
          <div className="font-isf text-[13px] font-bold leading-[21.48px] text-green-400">
            {name}
          </div>
          <div
            className="pt-2 font-isf text-[11px] font-normal leading-[14.3px] text-green-400"
            dir="rtl"
          >{`${followersNumber} دنبال کننده `}</div>
        </div>
      </div>

      <ToggleMenu imgSrc={Dots}>
        <ul>
          {CloseBlackList === "CloseFriendList" || isCloseFriend ? (
            <MenuLiOptionComponent
              text="حذف از دوستان نزدیک"
              iconsrc={addToCloseFriendsIcon}
              handleOnClick={() => setShowUnCloseFriendModal(true)}
            />
          ) : (
            !isCloseFriend &&
            !CloseBlackList && (
              <MenuLiOptionComponent
                text="افزودن به دوستان نزدیک"
                iconsrc={addToCloseFriendsIcon}
                handleOnClick={() => setShowCloseFriendModal(true)}
              />
            )
          )}

          {CloseBlackList === "BlackList" && (
            <MenuLiOptionComponent
              text="حذف از بلاک ها"
              iconsrc={addToCloseFriendsIcon}
              handleOnClick={() => setShowUnBlockModal(true)}
            />
          )}

          {CloseBlackList === "CloseFriendList" && (
            <MenuLiOptionComponent
              text="بلاک کردن"
              iconsrc={addToCloseFriendsIcon}
              handleOnClick={() => setShowBlockModal(true)}
            />
          )}

          {fromOthersProfile && (
            <MenuLiOptionComponent
              text="مشاهده پروفایل"
              handleOnClick={() => handleShowUserProfile(name)}
            />
          )}

          {FollowerFollowingList === "FollowingList" ? (
            <MenuLiOptionComponent
              text="حذف از دنبال شونده ها"
              iconsrc={Minus}
              handleOnClick={() => setShowUnFollowModal(true)}
            ></MenuLiOptionComponent>
          ) : FollowerFollowingList === "FollowerList" ? (
            <MenuLiOptionComponent
              text="حذف از دنبال کننده ها"
              iconsrc={Minus}
              handleOnClick={() => setShowRemoveFollowerModal(true)}
            ></MenuLiOptionComponent>
          ) : null}
        </ul>
      </ToggleMenu>

      {showCloseFriendModal && (
        <ModalTemplatePost
          showModal={showCloseFriendModal}
          onClose={() => setShowCloseFriendModal(false)}
        >
          <UsersCloseFriendModal
            username={name}
            avatar={avatar}
            followersCount={followersNumber}
            userId={id}
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
            username={name}
            avatar={avatar}
            followersCount={followersNumber}
            userId={id}
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
            username={name}
            avatar={avatar}
            followersCount={followersNumber}
            userId={id}
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
            username={name}
            avatar={avatar}
            followersCount={followersNumber}
            userId={id}
            onClick={() => setShowUnBlockModal(false)}
          ></UsersUnBlockModal>
        </ModalTemplatePost>
      )}

      {showUnFollowModal && (
        <ModalTemplatePost
          showModal={showUnFollowModal}
          onClose={() => setShowUnFollowModal(false)}
        >
          <UsersUnFollowModal
            username={name}
            avatar={avatar}
            followersCount={followersNumber}
            userId={id}
            onClick={() => setShowUnFollowModal(false)}
          ></UsersUnFollowModal>
        </ModalTemplatePost>
      )}

      {showRemoveFollowerModal && (
        <ModalTemplatePost
          showModal={showRemoveFollowerModal}
          onClose={() => setShowRemoveFollowerModal(false)}
        >
          <UsersRemoveFollowerModal
            username={name}
            avatar={avatar}
            followersCount={followersNumber}
            userId={id}
            onClick={() => setShowRemoveFollowerModal(false)}
          ></UsersRemoveFollowerModal>
        </ModalTemplatePost>
      )}
    </div>
  );
};

export default FollowerFollowing;
