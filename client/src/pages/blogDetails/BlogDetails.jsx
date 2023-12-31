import React, { useEffect, useState } from 'react'
import classes from './blogDetails.module.css'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { request } from '../../utils/fetchApi'
import Navbar from '../../components/navbar/Navbar'
import { format } from 'timeago.js'
import { AiFillEdit, AiFillLike, AiFillDelete, AiOutlineArrowRight, AiOutlineLike } from 'react-icons/ai'

const BlogDetails = () => {
  const [blogDetails, setBlogDetails] = useState("")
  const { id } = useParams()
  const { user, token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const options = { 'Authorization': `Bearer ${token}` }
        const data = await request(`/blog/find/${id}`, 'GET', options)
        setBlogDetails(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBlogDetails()
  }, [id])


  // delete
  const handleDeleteBlog = async() => {
    try {
      const options = {"Authorization": `Bearer ${token}`}
      await request(`/blog/deleteBlog/${id}`, "DELETE", options)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <Link to='/' className={classes.goBack}>
          Go Back <AiOutlineArrowRight />
        </Link>
        <div className={classes.wrapper}>
          <img src={`http://localhost:5000/images/${blogDetails?.photo}`} />
          <div className={classes.titleAndControls}>
            <h3 className={classes.title}>{blogDetails?.title}</h3>
            {blogDetails?.userId?._id === user._id &&
              <div className={classes.controls}>
                <Link to={`/updateBlog/${blogDetails?._id}`} className={classes.edit}>
                  <AiFillEdit />
                </Link>
                <div className={classes.delete}>
                  <AiFillDelete onClick={handleDeleteBlog}/>
                </div>
              </div>
              
            }
          </div>
          <div className={classes.descAndLikesViews}>
            <p className={classes.desc}>
              <span>Description: </span>
              {blogDetails?.desc}
            </p>
            <div className={classes.likesAndViews}>
              <span>{blogDetails?.views} views</span>
            </div>
          </div>
          <div className={classes.authorAndCreatedAt}>
            <span><span>Author:</span> {blogDetails?.userId?.username}</span>
            <span><span>Created At:</span> {format(blogDetails?.createdAt)}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogDetails