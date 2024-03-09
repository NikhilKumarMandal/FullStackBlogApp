import React,{useEffect,useState} from 'react'
import {useSelector} from 'react-redux'

function DashPosts() {
    const {currentUser} = useSelector((state) => state.user)
    const [userPosts,setUserPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/v1/blogs/`)
            } catch (error) {
                
            }
        }
    })
  return (
    <div>DashPosts</div>
  )
}

export default DashPosts