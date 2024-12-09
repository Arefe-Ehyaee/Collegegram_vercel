import { useState } from "react";
import angledpin from "../../assets/icons/angled-pin.svg";
import bookmark from "../../assets/icons/bookmark.svg";
import chat from "../../assets/icons/chat.svg";
import bell from "../../assets/icons/bell.svg";
import tags from "../../assets/icons/tag.svg";
import explore from "../../assets/icons/explore.svg";
import search from "../../assets/icons/search.svg";
import addPostIcon from "../../assets/icons/addposticon.svg";
import { userProfileAtom } from "../../user-actions/atoms";
import { useRecoilValue } from "recoil";
import ModalTemplate from "../ModalTemplate";
import UploadPostsModal from "../upload-edit-posts/UploadPostsModal";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";
import NotifBadge from "../Notification/NotifBadge";
import SideNavbarToggleMenu from "./SideNavbarToggleMenu";
import { useQuery } from "@tanstack/react-query";
import { fetchNotificationCount } from "./fetchNotificationCount";

export interface Notif {
  countUnseenNotifications: number;
}

export default function SideNavbarComponent() {
  const userProfile = useRecoilValue(userProfileAtom);
  const avatar = userProfile.avatar;
  const username = userProfile.username;
  const [uploadModal, setUploadModal] = useState(false);
  const token: string = localStorage.getItem("token") ?? ""
  const navigate = useNavigate();

  const handleCreatePostClick = () => {
    setUploadModal(true);
  };

;

  const {data:notifDataTotal} = useQuery({queryKey:['navbar notification count'],
    queryFn:fetchNotificationCount,
    refetchOnWindowFocus:true,
    refetchInterval:3000
  })
  return (
    <div dir="rtl" className="flex flex-col items-center justify-center">
      <div className="fixed right-0 top-16 mr-24 flex flex-col items-center">
        <CustomButton
          text="ایجاد پست جدید"
          size="large"
          iconsrc={addPostIcon}
          className="mb-8 bg-red-200"
          handleOnClick={handleCreatePostClick}
        ></CustomButton>
        <nav className="fixed bottom-0 top-36 flex w-72 flex-col rounded-t-3xl border border-grey-400 bg-white p-9">
          <div className="mb-8 flex items-center">
            <img
              src={avatar}
              alt="avatar"
              className="aspect-square h-[56px] w-[56px] rounded-full border border-grey-400 object-cover"
            />
            <p className="mr-4">{username}</p>
          </div>
          <div className="flex flex-grow flex-col justify-between">
            <div>
              <ul>
                <li className="flex items-center rounded-3xl p-4 hover:bg-grey-500">
                  <img src={angledpin} alt="my page icon" className="ml-2" />
                  <button onClick={() => navigate("/userprofile")}>
                    صفحه من
                  </button>
                </li>
                <li className="flex items-center rounded-3xl p-4 hover:bg-grey-500">
                  <img src={bookmark} alt="bookmarks icon" className="ml-2" />
                  <button onClick={() => navigate("/bookmarks")}>ذخیره‌ها</button>
                </li>
                {/* <li className="flex items-center rounded-3xl p-4 hover:bg-grey-500">
                  <img src={chat} alt="chats icon" className="ml-2" />
                  <a href="#">پیام‌ها</a>
                </li> */}
                <li className="flex items-center rounded-3xl p-4 hover:bg-grey-500"> 
                  <img src={bell} alt="notifications icon" className="ml-2" />
                  <div className="flex">
                    <button onClick={() => navigate("/myNotifications")} className="pl-4">اعلانات</button>
                    { notifDataTotal && notifDataTotal.data.countUnseenNotifications > 0 && (
                      <NotifBadge
                        notifCounts={notifDataTotal.data.countUnseenNotifications}
                      ></NotifBadge>
                    )}
                  </div>
                </li>
                <li className="flex items-center rounded-3xl p-4 hover:bg-grey-500">
                  <img src={tags} alt="tags icon" className="ml-2" />
                  <button onClick={() => navigate("/taggedPosts")} >تگ‌شده‌ها</button>
                </li>
              </ul>

              <ul className="mt-8 border-t border-grey-400 pt-8">
                <li className="flex items-center rounded-3xl p-4 hover:bg-grey-500">
                  <img src={explore} alt="explore icon" className="ml-2" />
                  <button onClick={() => navigate("/explore")}>اکسپلور</button>
                </li>
                <li className="flex items-center rounded-3xl p-4 hover:bg-grey-500">
                  <img src={search} alt="search icon" className="ml-2" />
                  <button onClick={() => navigate("/searchUsers")}>جستجو</button>
                </li>
              </ul>
            </div>
            <div className="flex pr-4">
              <SideNavbarToggleMenu/>
            </div>
          </div>
        </nav>
      </div>
      {uploadModal && (
        <ModalTemplate
          showModal={uploadModal}
          onClose={() => setUploadModal(false)}
        >
          {" "}
          <UploadPostsModal onClose={() => setUploadModal(false)} />
        </ModalTemplate>
      )}
    </div>
  );
}
