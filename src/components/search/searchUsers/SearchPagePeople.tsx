import MainLayout from "../../MainLayout";
import SideNavbarComponent from "../../nav-bar/SideNavbarComponent";
import SearchPagePeopleComponent from "./SearchPagePeopleComponent";

export default function SearchPagePeople () {
    return (
        <MainLayout mainComponents={SearchPagePeopleComponent()} navBar={SideNavbarComponent()}/>
    )

}