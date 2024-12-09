import hamMenu from "../assets/icons/hamMenu.svg";
import angledpin from "../assets/icons/angled-pin.svg";
import bookmark from "../assets/icons/bookmark.svg";
import chat from "../assets/icons/chat.svg";
import bell from "../assets/icons/bell.svg";
import tags from "../assets/icons/tag.svg";
import { useNavigate } from "react-router-dom";
import SwitchAccountComponent from "./nav-bar/SwitchAccountComponent";
import blockingIcon from "../assets/icons/blockUser.svg";
import addToCloseFriendsIcon from "../assets/icons/addToCloseFriends.svg";
import NotifBadge from "./Notification/NotifBadge";
import { fetchNotificationCount } from "./nav-bar/fetchNotificationCount"
import { useQuery } from "@tanstack/react-query";

export default function MobileHamMenu() {
  const navigate = useNavigate();
  const {data:notifDataTotal} = useQuery({queryKey:['navbar notification count'],
    queryFn:fetchNotificationCount,
    refetchOnWindowFocus:true
  })
  return (
    <div className="absolute bottom-0 w-full">
      <nav
        className="rounded-t-3xl border border-grey-400 bg-white p-9"
        dir="rtl"
        aria-label="mobile-nav"
      >
        <SwitchAccountComponent />
        <ul className="mt-4 border-t border-grey-400 pt-4">
          <li className="flex items-center p-3 hover:bg-grey-500">
            <img src={angledpin} alt="my page icon" className="ml-2" />
            <button onClick={() => navigate("/userprofile")}>صفحه من</button>
          </li>
          <li className="flex items-center p-3 hover:bg-grey-500">
            <button onClick={() => navigate("/bookmarks")}>
              <div className="flex">
                <img src={bookmark} alt="bookmarks icon" className="ml-2" />
                <a href="#">ذخیره‌ها</a>
              </div>
            </button>
          </li>
          {/* <li className="flex items-center p-3 hover:bg-grey-500">
            <img src={chat} alt="chats icon" className="ml-2" />
            <a href="#">پیام‌ها</a>
          </li> */}
          <li className="flex items-center p-3 hover:bg-grey-500"> 
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
          <li className="flex items-center p-3 hover:bg-grey-500">
            <button onClick={() => navigate("/taggedPosts")}>
              <div className="flex">
                <img src={tags} alt="tags icon" className="ml-2" />
                <a href="#">تگ‌شده‌ها</a>
              </div>
            </button>
          </li>
          <li className="flex items-center p-3 hover:bg-grey-500">
            <button onClick={() => navigate("/closeFriendsList")}>
              <div className="flex">
                <img
                  src={addToCloseFriendsIcon}
                  alt="add to close friends"
                  className="h-5 w-5"
                />
                <p className="pr-2">دوستان نزدیک</p>
              </div>
            </button>
          </li>
          <li className="flex items-center p-2 hover:bg-grey-500">
            <button onClick={() => navigate("/balckList")}>
              <div className="flex">
                <img src={blockingIcon} alt="block user" className="h-5 w-5" />
                <p className="pr-2">لیست سیاه</p>
              </div>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
