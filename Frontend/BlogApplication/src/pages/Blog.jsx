import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card/Card.jsx"

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs from the API
  const getAllBlogs = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('currentUser'));
      const accessToken = userData?.data?.accessToken;
      const response = await axios.get(
        "http://localhost:8000/api/v1/blogs/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data?.success) {
        setBlogs(response.data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        <Card/>
      </ul>
    </div>
  );
};

export default Blogs;