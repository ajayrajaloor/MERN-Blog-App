import React from 'react'
import classes from './home.module.css'
import Navbar from '../../components/navbar/Navbar'
import FeaturedBlogs from '../../components/featuredBlogs/FeaturedBlogs'

function Home() {
  return (
    <div>
      <Navbar/>
     <FeaturedBlogs/>
    </div>
  )
}

export default Home