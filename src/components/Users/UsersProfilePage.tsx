import MainLayout from "../MainLayout"
import SideNavbarComponent from "../nav-bar/SideNavbarComponent"
import UsersProfilePageComponent from "./UsersProfilePageComponent"

export default function UsersProfilePage () {
   
    return (
        <MainLayout mainComponents={UsersProfilePageComponent()} navBar={SideNavbarComponent()}/>
    )
}

