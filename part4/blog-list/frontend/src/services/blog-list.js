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

const updateBlog = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config);
  return response.data;
};

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${blog.id}`, config);
  return `"Blog ${blog.title}" was successfully deleted.`;
};

export default {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  setToken,
};
