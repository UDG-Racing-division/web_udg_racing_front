import '../styles/global.css'
import type { Post } from '../types/post'
import { PostStatus } from '../types/post'

interface PostCardProps extends Post {
  onReadMore?: (id: number) => void;
}

export function PostCard({ 
  id,
  title, 
  description, 
  status,
  author_id,
  author_name,
  date,
  coverImage,
  onReadMore 
}: PostCardProps) {
  const isPublished = status === PostStatus.PUBLISHED;
  
  const handleReadMore = () => {
    if (onReadMore) {
      onReadMore(id);
    }
  };

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {coverImage && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={coverImage.path}
            alt={coverImage.alt_text}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-500">{date}</p>
          {!isPublished && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              Draft
            </span>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <div className="flex justify-between items-center">
          <button 
            onClick={handleReadMore}
            className="px-4 py-2 text-blue-600 font-medium hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Read More
          </button>
          <span className="text-sm text-gray-500">Author: {author_name}</span>
        </div>
      </div>
    </article>
  )
}
