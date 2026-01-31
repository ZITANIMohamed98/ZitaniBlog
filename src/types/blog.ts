export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: number;
  tags: string[];
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBlogPost {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: number;
  tags: string[];
  coverImage?: string;
}

export type UpdateBlogPost = Partial<CreateBlogPost>;
