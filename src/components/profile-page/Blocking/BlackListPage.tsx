import MainLayout from "../../MainLayout"
import SideNavbarComponent from "../../nav-bar/SideNavbarComponent"
import BlackListPageComponent from "./BlackListPageComponent"






export default function BlackListPage () {
    return (
        <MainLayout mainComponents={BlackListPageComponent()} navBar={SideNavbarComponent()}/>
    )

}