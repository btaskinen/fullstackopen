require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const Blog = require('./models/blog-entry');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  next(error);
};

app.use(cors());
app.use(express.json());

app.get('/info', (request, response) => {
  const timeOfRequest = new Date();
  response.send(
    `
    <p>The Blog List is a list of exciting blogs.<p>
    <p>${timeOfRequest}<p>
    `
  );
});

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post('/api/blogs', (request, response, next) => {
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

  blog
    .save()
    .then((savedBlog) => {
      response.status(201).json(savedBlog);
    })
    .catch((error) => next(error));
});

app.delete('/api/blogs/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
