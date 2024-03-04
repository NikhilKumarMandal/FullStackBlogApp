import React, { useState, useEffect } from 'react';
import Card from '../components/Card/Card.jsx';

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
                console.log("hello world");
                  const data = await res.json();
                  setBlogs(data.data); 
                  console.log("Data is ",typeof data);
              } else {
                  throw new Error('Failed to fetch data');
              }
          } catch (error) {
              console.log(error);
          }
      };
      getAccessToken();
      console.log("hello",typeof blogs);
  }, []); 

  


return (
<div>
    
  {blogs && blogs.map(blog => (
        <Card
        key={blog.id}
        title = {blog.title}
        content = {blog.content}
        thumbnail = {blog.thumbnail}
        author = {blog.author.username}
        />
  ))}

    </div>
  );
}

export default Blog;
