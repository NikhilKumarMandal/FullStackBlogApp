import React, { useState, useEffect } from 'react';
import Card from '../components/Card/Card.jsx';

function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
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
          setBlogs(data.data); 
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogs();
  }, []); 
  

  return (
    <div className='grid gap-4 m-4 sm:grid-cols-4 '>
      {blogs.map(blog => (
        <div key={blog?._id}>
        <Card
          title={blog.title}
          content={blog.content}
          thumbnail={blog.thumbnail}
          username={blog?.author} 
        />
        </div>
        
      ))}
    </div>
  );
}

export default Blog;
