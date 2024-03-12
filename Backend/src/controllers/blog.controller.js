import mongoose, {isValidObjectId} from "mongoose"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Blog } from "../models/blog.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// TEST CASE PASS
const createBlog = asyncHandler(async(req,res) => {
    const { title,content } = req.body

    if (
        [title,content].some((field) => field?.trim() === "" )
    ) {
        throw new ApiError(400,"All fileds are requried")
    }

    let thumbnailLocalPath;
    if (req.files && Array.isArray(req.files.thumbnail) && req.files.thumbnail.length > 0) {
        thumbnailLocalPath = req.files.thumbnail[0].path
    }

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail file is required")
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if (!thumbnail) {
        throw new ApiError(400, "Thumbnail file is required")
    }
    console.log(thumbnail?.url);
    const blog = await Blog.create({
        title,
        content,
        thumbnail: thumbnail?.url,
        author: req.user?._id
    })


    if (!blog) {
        throw new ApiError(500,"Something went wrong while making your blog")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            blog,
            "Blog create successfully"
            )
        )

})

const updateBlog = asyncHandler(async(req,res) => {
    const { blogId } = req.params
    const {title,content} = req.body;
    const thumbnailLocalPath = req.file?.path

    try {
        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
        console.log("thumbnail:",thumbnail);
        
        if (!title && !content && !thumbnail) {
            throw new ApiError( "At least one field is required")
        }
    
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $set: {
                    title,
                    content,
                    thumbnail: thumbnail?.url
                }
            },
            {
                new: true
            }
        )
    
        if (!blog) {
            throw new ApiError("Video not found")  
        }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            blog,
            "Blog updated successfully"
            )
        )
    } catch (error) {
        throw new ApiError(500,error?.message || "Internal Server Error")
    }
})

const deleteBlog = asyncHandler(async(req,res) => {
    const { blogId } = req.params

    if (!blogId || !isValidObjectId(blogId)) {
        throw new ApiError(400, "Invalid Blog id");
    }

    const blog = await Blog.findByIdAndDelete(blogId)

    if (!blog) {
        throw new ApiError(404, "Blog does not exist");
    }
    
    return res
        .status(200)
        .json(
        new ApiResponse(
            200,
            { deletedBlog: blog },
            "Blog deleted successfully"
            )
        );

})

const getBlogById = asyncHandler(async(req,res) => {
    const { blogId } = req.params;
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(404, "Blog does not exist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, blog, "Blog fetched successfully"));
})

const getAllBlog = asyncHandler(async (req, res) => {
    const { query } = req.query;

    try {
        let blogs = await Blog.aggregate([
            {
                $match: query?.length > 0
                    ? {
                        title: {
                            $regex: query.trim(),
                            $options: "i",
                        },
                    }
                    : {},
            },
            {
                $sort: {
                    updatedAt: -1,
                },
            },
            {
                $lookup: {
                    from: "users", // Assuming your users collection name is 'users'
                    localField: "author",
                    foreignField: "_id",
                    as: "authorInfo",
                },
            },
            {
                $addFields: {
                    author: { $arrayElemAt: ["$authorInfo.username", 0] },
                },
            },
            {
                $project: {
                    authorInfo: 0, // Exclude authorInfo field
                },
            },
        ]);

        const totalPosts = await Blog.countDocuments();

        const now = new Date();
    
        const oneMonthAgo = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
    
        const lastMonthPosts = await Blog.countDocuments({
          createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json(new ApiResponse(200,{blogs,totalPosts,lastMonthPosts},"Blogs fetched successfully"));
    } catch (error) {
        console.error(error);
        throw new ApiError(500," Something went wrong while fetched the data ")
    }
});

 const getposts = async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order === 'asc' ? 1 : -1;
      const posts = await Blog.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.blogId && { _id: req.query.blogId }),
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: 'i' } },
            { content: { $regex: req.query.searchTerm, $options: 'i' } },
          ],
        }),
      })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
  
      const totalPosts = await Blog.countDocuments();
  
      const now = new Date();
  
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
  
      const lastMonthPosts = await Blog.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
  
      res.status(200).json(new ApiResponse(
        200,
        {
            posts,
            totalPosts,
            lastMonthPosts,
        },
        "Posts fetched successfully"
      ));
    } catch (error) {
      next(error);
    }
  };




export {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogById,
    getAllBlog,
    getposts
}