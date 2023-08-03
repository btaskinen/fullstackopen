const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog-entry');
const User = require('../models/user');

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

test('add new blog post without title', async () => {
  const newBlog = {
    author: 'James Tester',
    url: 'https://testing.com/newBlogPost',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('{"error":"Title is missing!"}');
});

test('add new blog post without author', async () => {
  const newBlog = {
    title: 'New Test Blog',
    url: 'https://testing.com/newBlogPost',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('{"error":"Author is missing!"}');
});

test('add new blog post without url', async () => {
  const newBlog = {
    title: 'New Test Blog',
    author: 'James Tester',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('{"error":"URL is missing!"}');
});

test('verify value of linkes in new blog', async () => {
  const newBlog = {
    title: 'Save New Blog Post',
    author: 'James Tester',
    url: 'https://testing.com/newBlogPost',
  };

  const response = await api.post('/api/blogs').send(newBlog);

  expect(response.status).toEqual(201);
  expect(response.body.likes).toEqual(0);
});

test('delete single blog post', async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToBeDeleted = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToBeDeleted.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).not.toContain(blogToBeDeleted.title);
});

test('update links in blog post', async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToBeUpdated = blogsAtStart[0];

  const updatedBlog = {
    title: blogToBeUpdated.title,
    author: blogToBeUpdated.author,
    url: blogToBeUpdated.url,
    likes: blogToBeUpdated.likes + 1,
  };

  await api
    .put(`/api/blogs/${blogToBeUpdated.id}`)
    .send(updatedBlog)
    .expect(200);

  const blogsAtEnd = await helper.blogsInDb();

  const blogAfterUpdating = blogsAtEnd[0];

  expect(blogAfterUpdating.likes).toEqual(helper.initialBlogs[0].likes + 1);
});

describe('user test when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('password1', 10);
    const user = new User({
      username: 'FirstUser',
      name: 'First User',
      passwordHash,
    });

    await user.save();
  });

  test('successful creation of new user', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'SecondUser',
      name: 'Second User',
      password: 'password2',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('new user with missing username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: 'Second User',
      password: 'password2',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect(
        '{"error":"User validation failed: username: Path `username` is required."}'
      );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).not.toContain(newUser.username);
  });

  test('new user with too short username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: '2',
      name: 'Second User',
      password: 'password2',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect(
        '{"error":"User validation failed: username: Username must be at least 3 characters!"}'
      );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).not.toContain(newUser.username);
  });

  test('new user with missing name', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'SecondUser',
      password: 'password2',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('{"error":"Name is missing!"}');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).not.toContain(newUser.username);
  });

  test('new user with missing password', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'SecondUser',
      name: 'Second User',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('{"error":"Password is missing!"}');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).not.toContain(newUser.username);
  });

  test('new user with too short password', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'SecondUser',
      name: 'Second User',
      password: 'PW',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('{"error":"Password must be at least 3 characters long!"}');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).not.toContain(newUser.username);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
