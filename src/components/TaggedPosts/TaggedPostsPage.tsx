import MainLayout from '../MainLayout'
import SideNavbarComponent from '../nav-bar/SideNavbarComponent'
import TaggedPostsComponent from './TaggedPostsComponent'

const TaggedPostsPage = () => {
  return (
    <MainLayout mainComponents={<TaggedPostsComponent/>} navBar={<SideNavbarComponent/>}/>
  )
}

export default TaggedPostsPage