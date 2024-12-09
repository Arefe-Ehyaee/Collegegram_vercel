import MainLayout from "../../MainLayout"
import SideNavbarComponent from "../../nav-bar/SideNavbarComponent"
import CloseFriendsPageComponent from "./CloseFriendsPageComponent"



export default function CloseFriendsPage () {
    return (
        <MainLayout mainComponents={CloseFriendsPageComponent()} navBar={SideNavbarComponent()}/>
    )

}