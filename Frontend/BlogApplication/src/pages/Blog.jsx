import React, { useState, useEffect } from 'react';
import Card from '../components/Card/Card.jsx'; // Import your Card component

function Blog() {
  const [blogs, setBlogs] = useState([]);
    useEffect(() => {
      const getAccessToken = async () => {
          try {
              const persistedStateString = localStorage.getItem('persist:root');
              const persistedState = JSON.parse(persistedStateString);
              const accessToken = JSON.parse(persistedState.user).currentUser.data.accessToken;
              const res = await fetch('http://localhost:8000/api/v1/blogs/', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${accessToken}`
                  }
              });

              if (res.ok) {
                  const data = await res.json();
                  setBlogs(data); 
              } else {
                  throw new Error('Failed to fetch data');
              }
          } catch (error) {
              console.log(error);
          }
      };
      getAccessToken();
  }, []); 


  return (
    <div className='w-full py-8'>
      <div className='flex flex-wrap'>
        
          <div  className='p-2 w-1/4'>
            <Card  /> 
          </div>
        
      </div>
    </div>
  );
}

export default Blog;
