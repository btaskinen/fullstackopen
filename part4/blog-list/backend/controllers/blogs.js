const blogsRouter = require('express').Router();
const Blog = require('../models/blog-entry');

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
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { title, author, url } = request.body;

  if (!title) return response.status(400).json({ error: 'Title is missing!' });
  if (!author)
    return response.status(400).json({ error: 'Author is missing!' });
  if (!url) return response.status(400).json({ error: 'URL is missing!' });

  const blog = new Blog({
    title,
    author,
    url,
    likes: 0,
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.put('/:id', (request, response, next) => {
  const { title, author, url, likes } = request.body;

  Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true }
  )
    .then((updatedBlog) => {
      response.status(200).json(updatedBlog);
    })
    .catch((error) => next(error));
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
