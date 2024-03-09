import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
    <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>   
    <from className='flex flex-col gap-4'>
        <diV className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput type='text' placeholder='Title' required id='title'
            className='flex-1' />
            <select>
                <option value="uncategorized">Select a category</option>
                <option value='javascript'>Javascript</option>
                <option value='reactjs'>React.js</option>
            </select>
        </diV>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
        <FileInput type='file' accept='image/*'></FileInput>
        <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>Upload Thumbnail</Button>
        </div>
        <ReactQuill theme="snow" placeholder='write Something...' className='h-72 mb-12'/>
        <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
    </from>     
    </div>
  )
}

export default CreatePost