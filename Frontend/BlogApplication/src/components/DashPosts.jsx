import React,{useEffect,useState} from 'react'
import {useSelector} from 'react-redux'

function DashPosts() {
    const {currentUser} = useSelector((state) => state.user)
    console.log(currentUser);
    const [userPosts,setUserPosts] = useState([])
    useEffect(() => {
        const getAccessToken = async () => {
          try {
            const persistedStateString = localStorage.getItem('persist:root');
            const persistedState = JSON.parse(persistedStateString);
            const accessToken = JSON.parse(persistedState.user)?.currentUser?.data?.accessToken;
    
            if (!accessToken) {
              throw new Error('Access token not found');
            }
    
            const res = await fetch(`http://localhost:8000/api/v1/blogs/?userId=${currentUser.data.user._id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
              }
            });
    
            if (res.ok) {
              const data = await res.json();
              setUserPosts(data); 
            } else {
              throw new Error('Failed to fetch data');
            }
          } catch (error) {
            console.log(error);
          }
        };
        if (currentUser.data.user.isAdmin) {
            getAccessToken()
        }
    
        getAccessToken();
      }, []); 
  return (
    <div>DashPosts</div>
  )
}

export default DashPosts