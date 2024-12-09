import React from "react";
import moreSideNav from "../../assets/icons/terms.svg";
import ToggleMenu from "../ToggleMenu";
import addToCloseFriendsIcon from "../../assets/icons/addToCloseFriends.svg";
import blockingIcon from "../../assets/icons/blockUser.svg";
import { useNavigate } from "react-router-dom";
import SwitchAccountComponent from "./SwitchAccountComponent";

const SideNavbarToggleMenu = () => {
  const navigate = useNavigate();
  return (
    <ToggleMenu imgSrc={moreSideNav} label="بیشتر">
      <div>
        <div>
          <SwitchAccountComponent />
        </div>
        <ul className="mt-8 border-t border-grey-400 pt-8">
          <li className="flex items-center rounded-3xl p-4 hover:bg-grey-500">
            <button onClick={() => navigate("/closeFriendsList")}>
              <div className="flex">
                <img
                  src={addToCloseFriendsIcon}
                  alt="add to close friends"
                  className="h-5 w-5"
                />
                <p className="pr-4">دوستان نزدیک</p>
              </div>
            </button>
          </li>
          <li className="flex items-center rounded-3xl p-4 hover:bg-grey-500">
            <button onClick={() => navigate("/balckList")}>
              <div className="flex">
                <img src={blockingIcon} alt="block user" className="h-5 w-5" />
                <p className="pr-4">لیست سیاه</p>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </ToggleMenu>
  );
};

export default SideNavbarToggleMenu;
