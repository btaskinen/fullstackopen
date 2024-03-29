const Blog = require('../models/blog-entry');
const User = require('../models/user');

const userCredentials = {
  username: 'FirstUser',
  password: 'password1',
};

const initialBlogs = [
  {
    title: 'Mastering TypeScript: 20 Best Practices for Improved Code Quality',
    author: 'Vitalii Shevchuk',
    url: 'https://medium.com/itnext/mastering-typescript-21-best-practices-for-improved-code-quality-2f7615e1fdc3',
    likes: 4,
    id: '64a4221a0e79e2e1f7d1cde6',
  },
  {
    title: '18 Best Practices for React',
    author: 'Najm Eddine Zaga',
    url: 'https://medium.com/@najm-eddine-zaga/18-best-practices-for-react-617e23ed7f2c',
    likes: 5,
    id: '64a67b3d5356bf8efd263625',
  },
  {
    title: '7 React Projects for Beginners in 2023 (+ Code)',
    author: 'Reed Barger',
    url: 'https://medium.com/webdevhero/7-react-projects-for-beginners-in-2023-code-1430229684b6',
    likes: 8,
    id: '64a7c56b64a8859e96456554',
  },
  {
    title: '5 Reasons to Use TypeScript for Your Projects',
    author:
      'Alfonso Valdes Carrales  Alfonso Valdes Carrales Alfonso Valdes Carrales We build and scale Software tech teams through LATAM and Nearshore talent. HIRE US  385 Followers  Follow',
    url: 'https://javascript.plainenglish.io/5-reasons-to-use-typescript-for-your-projects-5b60249317f1',
    likes: 2,
    id: '64a804ef0ea03ab2771fb29f',
  },
  {
    title: 'Developer essentials: How to search code using grep',
    author: 'Brian Smith',
    url: 'https://developer.mozilla.org/en-US/blog/searching-code-with-grep/',
    likes: 0,
    id: '64a95a385136857e374c7e92',
  },
  {
    title: 'New reference pages on MDN for JavaScript regular expressions',
    author: 'Brian Smith',
    url: 'https://developer.mozilla.org/en-US/blog/regular-expressions-reference-updates/',
    likes: 2,
    id: '64a95b295136857e374c7e94',
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

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  userCredentials,
  initialBlogs,
  blogsInDb,
  usersInDb,
};
