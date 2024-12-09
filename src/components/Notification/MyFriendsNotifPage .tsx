import MainLayout from "../MainLayout";
import SideNavbarComponent from "../nav-bar/SideNavbarComponent";
import MyFriendsNotifPageComponent from "./MyFriendsNotifPageComponent";







export default function MyFriendsNotifPage () {
    return (
        <MainLayout mainComponents={MyFriendsNotifPageComponent()} navBar={SideNavbarComponent()}/>
    )

}