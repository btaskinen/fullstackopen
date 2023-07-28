const Blog = require('../models/blog-entry');

const initialBlogs = [
  {
    title: 'Mastering TypeScript: 20 Best Practices for Improved Code Quality',
    author: 'Vitalii Shevchuk',
    url: 'https://medium.com/itnext/mastering-typescript-21-best-practices-for-improved-code-quality-2f7615e1fdc3',
    likes: 4,
    id: '64a4221a0e79e2e1f7d1cde6',
  },
  {
    title: '7 React Projects for Beginners in 2023 (+ Code)',
    author: 'Reed Barger',
    url: 'https://medium.com/webdevhero/7-react-projects-for-beginners-in-2023-code-1430229684b6',
    likes: 8,
    id: '64a7c56b64a8859e96456554',
  },
  {
    title: 'How React Works Under the Hood',
    author: 'Shantanu Patil',
    url: 'https://medium.com/zipy-ai/how-react-works-under-the-hood-d2af692e8be0',
    likes: 0,
    id: '64c38ddb5766c975fdbcf62a',
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
