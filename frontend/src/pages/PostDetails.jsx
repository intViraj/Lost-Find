import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../utils/api";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch post
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await getPostById(id);
        setPost(postRes.data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);


  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading post...</p>;
  }

  if (!post) {
    return <p className="text-center mt-10 text-red-500">Post not found</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4">{post.description}</p>

        <div className="flex gap-4 flex-wrap mb-4">
          {post.images?.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt="post"
              className="w-40 h-40 object-cover rounded-lg border"
            />
          ))}
        </div>

        <p className="text-sm text-gray-500">
          Category: <span className="font-medium">{post.category}</span>
        </p>
        <p className="text-sm text-gray-500">
          Posted by: <span className="font-medium">{post.user?.name}</span>
        </p>
      </div>
    </div>
  );
};

export default PostDetails;
