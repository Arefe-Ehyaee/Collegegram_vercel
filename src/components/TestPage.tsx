import timeTranslate from "../utilities/timeTranslationFunction";
import BlankExploreComponent from "./explore/BlankExploreComponent";
import ExplorePostCard from "./explore/ExplorePostCard";
import MainLayout from "./MainLayout";
import SideNavbarComponent from "./nav-bar/SideNavbarComponent";
import { userProfileAtom } from "../user-actions/atoms";
import { useRecoilValue } from "recoil";
import NotificationComponent from "./Notification/NotificationComponent";


const TestPage = () => {
  const mockProfileInfo = useRecoilValue(userProfileAtom)
  const defaultProps = {
    comments:50,
    bookmarks:3,
      likes: 1313,
    };
    
    const posterProps = {
      avatar: mockProfileInfo.avatar,
      name:mockProfileInfo.username,
      followersCount:600
    }
    const postCardProps = {
      postCardInteractionProps : defaultProps,
      posterInfoProps:posterProps,
      postImageSrc:mockProfileInfo.avatar,
    
    }

  return (
    <MainLayout  navBar={SideNavbarComponent()}/>
  );
};

export default TestPage;
