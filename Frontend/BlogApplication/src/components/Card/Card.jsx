import React from 'react'
import { ArrowUpRight } from 'lucide-react'

function Card({title,content,thumbnail,username}) {
  return (
    <div className="w-[300px] rounded-md border">
      <img  src={thumbnail} 
        alt="Laptop"
        className="h-[200px] w-full rounded-t-md object-cover"
      />
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {title} &nbsp; <ArrowUpRight className="h-4 w-4" />
        </h1>
        <h3 className="mt-3 text-sm text-gray-900">
        Author: {username}
        </h3>
        <button
          type="button"
          className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Read
        </button>
      </div>
    </div>
  )
}

export default Card