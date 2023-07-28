const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog-entry');

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('id property is correctly formatted', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

test('successfully save new blog post', async () => {
  const newBlog = {
    title: 'Save New Blog Post',
    author: 'James Tester',
    url: 'https://testing.com/newBlogPost',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  const titles = blogsAtEnd.map((blog) => blog.title);

  expect(titles).toHaveLength(helper.initialBlogs.length + 1);
  expect(titles).toContain('Save New Blog Post');
});

afterAll(async () => {
  await mongoose.connection.close();
});
