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
