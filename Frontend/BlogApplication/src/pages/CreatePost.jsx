import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';

function CreatePost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'uncategorized',
    thumbnail: null,
    content: ''
  });

  const [publishError, setPublishError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const persistedStateString = localStorage.getItem('persist:root');
      const persistedState = JSON.parse(persistedStateString);
      const accessToken = JSON.parse(persistedState.user).currentUser.data.accessToken;

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('thumbnail', formData.thumbnail);

      const res = await fetch('http://localhost:8000/api/v1/blogs/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: formDataToSend
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      setPublishError(null);
      navigate(`/post/${data._id}`);
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, thumbnail: e.target.files[0] });
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit} encType="multipart/form-data">
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <input
          className='flex-1'
            type='text'
            placeholder='Title'
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="uncategorized">Select a category</option>
            <option value='javascript'>Javascript</option>
            <option value='reactjs'>React.js</option>
          </select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <input
            type='file'
            accept='image/*'
            id='thumbnail'
            onChange={handleFileChange}
          />
          <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>Upload Thumbnail</Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder='Write something...'
          className='h-72 mb-12'
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
       <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
      </form>
    </div>
  );
}

export default CreatePost;
