import axios from 'axios';

const baseUrl = '/api/blogs';

const getAllBlogs = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createBlog = (newBlog) => {
  const request = axios.post(baseUrl, newBlog);
  return request.then((response) => response.data);
};

const updateBlog = (id, updatedBlog) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedBlog);
  return request.then((response) => response.data);
};

const deleteBlog = (blog) => {
  const request = axios.delete(`${baseUrl}/${blog.id}`);
  return request.then(() => `"Blog ${blog.title}" was successfully deleted.`);
};

export default {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
