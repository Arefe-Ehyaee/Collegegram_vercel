import MainLayout from "../../MainLayout";
import SideNavbarComponent from "../../nav-bar/SideNavbarComponent";
import SearchPagePostComponent from "./SearchPagePostComponent";

export default function SearchPagePosts () {
    return (
        <MainLayout mainComponents={SearchPagePostComponent()} navBar={SideNavbarComponent()}/>
    )

}