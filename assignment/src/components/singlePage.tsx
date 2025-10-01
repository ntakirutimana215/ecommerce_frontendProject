import { useParams, useNavigate } from "react-router-dom";
import { Calendar, User, Eye, MessageCircle } from "lucide-react";

import image2 from '../assets/ProgrPc.jpg';
import image3 from '../assets/ProgrPc.jpg';
import image4 from '../assets/Smartp.jpg';
import image5 from '../assets/ProgrPc.jpg';
import image6 from '../assets/ProgrPc.jpg';

const blogImages = [image2, image3, image4, image5, image6];

const blogs = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Blog Post ${i + 1}: Latest Tech Trends`,
  excerpt: "Discover the latest innovations and trends shaping the future of technology and digital commerce...",
  content: "Full article content would go here with detailed insights, analysis, images, and tips for readers. You can extend this section to include multiple paragraphs, lists, code snippets, or any media content.",
  date: `2025-09-${(i % 30) + 1}`,
  author: `Author ${(i % 5) + 1}`,
  comments: Math.floor(Math.random() * 20) + 1,
  views: Math.floor(Math.random() * 200) + 50,
  image: blogImages[i % blogImages.length],
  category: ["Technology", "Business", "Design", "Marketing", "E-commerce"][i % 5],
  readTime: Math.floor(Math.random() * 10) + 2,
}));

export default function SingleBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-700 text-lg">Blog not found!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-yellow-400 font-semibold hover:underline"
        >
          &larr; Back to Blogs
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-80 object-cover"
          />

          <div className="p-6">
            <div className="flex items-center gap-4 mb-4 text-gray-500">
              <div className="flex items-center gap-1">
                <User size={16} />
                <span className="text-sm">{blog.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span className="text-sm">{blog.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye size={16} />
                <span className="text-sm">{blog.views} views</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle size={16} />
                <span className="text-sm">{blog.comments} comments</span>
              </div>
            </div>

            <span className="inline-block bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
              {blog.category}
            </span>

            <h1 className="text-3xl font-bold text-gray-800 mb-6">{blog.title}</h1>

            <p className="text-gray-700 text-lg leading-relaxed mb-4">{blog.content}</p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">{blog.content}</p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">{blog.content}</p>

            {/* You can add more sections here: images, subheadings, lists, etc. */}

          </div>
        </div>
      </div>
    </div>
  );
}
