
import MainLayout from "../MainLayout"
import ProfilePageComponent from "./ProfilePageComponent"
import SideNavbarComponent from "../nav-bar/SideNavbarComponent"




export default function ProfilePage () {
   
    return (
        <MainLayout mainComponents={ProfilePageComponent()} navBar={SideNavbarComponent()}/>
    )
}

//leaving this comment here to test something