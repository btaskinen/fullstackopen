const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog-entry');
const User = require('../models/user');

describe('test login function', () => {
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

  test('login user', async () => {
    const userCredentials = {
      username: 'FirstUser',
      password: 'password1',
    };

    const response = await api
      .post('/api/login')
      .send(userCredentials)
      .expect(200);

    expect(response.body.username).toBe('FirstUser');
    expect(response.body.token);
  });
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

describe('Getting, creating and editing blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog);
      await blogObject.save();
    }

    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('password1', 10);
    const user = new User({
      username: 'FirstUser',
      name: 'First User',
      passwordHash,
    });

    await user.save();
  });

  test('blogs are returned as JSON', async () => {
    const response = await api.post('/api/login').send(helper.userCredentials);

    const token = response.body.token;

    await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send(helper.userCredentials);

    const token = loginResponse.body.token;
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('id property is correctly formatted', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send(helper.userCredentials);

    const token = loginResponse.body.token;

    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`);

    expect(response.body[0].id).toBeDefined();
  });

  test('successfully save new blog post', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send(helper.userCredentials);

    const token = loginResponse.body.token;

    const newBlog = {
      title: 'Save New Blog Post',
      author: 'James Tester',
      url: 'https://testing.com/newBlogPost',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    const titles = blogsAtEnd.map((blog) => blog.title);

    expect(titles).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain('Save New Blog Post');
  });

  test('save new blog post without authentication', async () => {
    const newBlog = {
      title: 'Save New Blog Post',
      author: 'James Tester',
      url: 'https://testing.com/newBlogPost',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });

  test('add new blog post without title', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send(helper.userCredentials);

    const token = loginResponse.body.token;

    const newBlog = {
      author: 'James Tester',
      url: 'https://testing.com/newBlogPost',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('{"error":"Title is missing!"}');
  });

  test('add new blog post without author', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send(helper.userCredentials);

    const token = loginResponse.body.token;

    const newBlog = {
      title: 'New Test Blog',
      url: 'https://testing.com/newBlogPost',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('{"error":"Author is missing!"}');
  });

  test('add new blog post without url', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send(helper.userCredentials);

    const token = loginResponse.body.token;

    const newBlog = {
      title: 'New Test Blog',
      author: 'James Tester',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('{"error":"URL is missing!"}');
  });

  test('verify value of linkes in new blog', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send(helper.userCredentials);

    const token = loginResponse.body.token;

    const newBlog = {
      title: 'Save New Blog Post',
      author: 'James Tester',
      url: 'https://testing.com/newBlogPost',
    };

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog);

    expect(response.status).toEqual(201);
    expect(response.body.likes).toEqual(0);
  });

  test('delete single blog post', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send(helper.userCredentials);

    const token = loginResponse.body.token;

    const newBlog = {
      title: 'Save New Blog Post',
      author: 'James Tester',
      url: 'https://testing.com/newBlogPost',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const updatedBlogs = await helper.blogsInDb();

    const blogToBeDeleted = updatedBlogs[updatedBlogs.length - 1];

    await api
      .delete(`/api/blogs/${blogToBeDeleted.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain(blogToBeDeleted.title);
  });

  test('update links in blog post', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send(helper.userCredentials);

    const token = loginResponse.body.token;

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
      .set('Authorization', `bearer ${token}`)
      .send(updatedBlog)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();

    const blogAfterUpdating = blogsAtEnd[0];

    expect(blogAfterUpdating.likes).toEqual(helper.initialBlogs[0].likes + 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
