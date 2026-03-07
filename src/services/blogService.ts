import { apiClient } from './apiClient';
import type { ApiResponse } from '../types/auth';
import type { Blog, BlogsListData, CreateBlogInput, UpdateBlogInput } from '../types/blog';

function getAdminHeaders(): Record<string, string> {
  const token = sessionStorage.getItem('adminToken');
  return token ? { 'x-admin-key': token } : {};
}

export interface GetBlogsParams {
  category?: string;
  page?: number;
  limit?: number;
}

class BlogService {
  async getBlogs(params: GetBlogsParams = {}): Promise<BlogsListData> {
    const q = new URLSearchParams();
    if (params.category) q.set('category', params.category);
    if (params.page) q.set('page', String(params.page));
    if (params.limit) q.set('limit', String(params.limit));
    const qs = q.toString();
    const res = await apiClient.get<ApiResponse<BlogsListData>>(
      `/blogs${qs ? `?${qs}` : ''}`
    );
    return res.data;
  }

  async getBlog(id: string): Promise<Blog> {
    const res = await apiClient.get<ApiResponse<{ blog: Blog }>>(`/blogs/${id}`);
    return res.data.blog;
  }

  async createBlog(input: CreateBlogInput): Promise<Blog> {
    const res = await apiClient.post<ApiResponse<{ blog: Blog }>>(
      '/blogs',
      input,
      { headers: getAdminHeaders() }
    );
    return res.data.blog;
  }

  async updateBlog(id: string, input: UpdateBlogInput): Promise<Blog> {
    const res = await apiClient.put<ApiResponse<{ blog: Blog }>>(
      `/blogs/${id}`,
      input,
      { headers: getAdminHeaders() }
    );
    return res.data.blog;
  }

  async deleteBlog(id: string): Promise<void> {
    await apiClient.delete(`/blogs/${id}`, { headers: getAdminHeaders() });
  }
}

export const blogService = new BlogService();
