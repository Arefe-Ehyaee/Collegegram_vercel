import React from 'react'
import MainLayout from '../MainLayout'
import BookmarksComponent from './BookmarksComponent'
import SideNavbarComponent from '../nav-bar/SideNavbarComponent'

const BookmarksPage = () => {
  return (
    <MainLayout mainComponents={<BookmarksComponent/>} navBar={<SideNavbarComponent/>}/>
  )
}
export default BookmarksPage