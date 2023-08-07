import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAllBlogs = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = axios.get(baseUrl, config);
  return (await response).data;
};

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
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
  setToken,
};
