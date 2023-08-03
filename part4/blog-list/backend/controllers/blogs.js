const blogsRouter = require('express').Router();
const Blog = require('../models/blog-entry');
const User = require('../models/user');

blogsRouter.get('/info', (request, response) => {
  const timeOfRequest = new Date();
  response.send(
    `
    <p>The Blog List is a list of exciting blogs.<p>
    <p>${timeOfRequest}<p>
    `
  );
});

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, userId } = request.body;

  const user = await User.findById(userId);

  if (!title) return response.status(400).json({ error: 'Title is missing!' });
  if (!author)
    return response.status(400).json({ error: 'Author is missing!' });
  if (!url) return response.status(400).json({ error: 'URL is missing!' });

  const blog = new Blog({
    title,
    author,
    url,
    likes: 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true }
  );
  response.status(200).json(updatedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
