export enum PostStatus {
  DRAFT = 0,
  PUBLISHED = 1
}

export interface Author {
    id: number;
    name: string;
    email: string;
    profile_picture?: string;
    }

export interface Image {
  id: number;
  path: string;
  alt_text: string;
  is_cover: number;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  content: string;
  status: PostStatus;
  author_id: number;
  author_name?: string;
  date: string;
  coverImage?: Image;
}

export interface APIPost {
  id: number;
  title: string;
  description: string;
  content: string;
  status: number;
  author_id: number;
  created_at: string;
  images: Image[];
  author: Author;
}

export interface APIResponse<T> {
  status: number;
  data: T;
  message: string;
}

export type PostsResponse = APIResponse<APIPost[]>;

export const mapAPIPostToPost = (apiPost: APIPost): Post => {
  const coverImage = apiPost.images?.find(img => img.is_cover === 1);
  
  return {
    id: apiPost.id,
    title: apiPost.title,
    description: apiPost.description,
    content: apiPost.content,
    status: apiPost.status as PostStatus,
    author_id: apiPost.author_id,
    author_name: apiPost.author?.name || "Unknown",
    date: apiPost.created_at,
    coverImage: coverImage
  };
};