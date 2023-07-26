const listHelper = require('../utils/list_helper');

const emptyList = [];

const listWithOneBlog = [
  {
    title: '18 Best Practices for React',
    author: 'Najm Eddine Zaga',
    url: 'https://medium.com/@najm-eddine-zaga/18-best-practices-for-react-617e23ed7f2c',
    likes: 5,
    id: '64a67b3d5356bf8efd263625',
  },
];

const listWithManyBlogs = [
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
];

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);

  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList);

    expect(result).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    console.log(listWithOneBlog[0].likes);
    expect(result).toBe(listWithOneBlog[0].likes);
  });

  test('of list with many blogs to equal the sum', () => {
    const result = listHelper.totalLikes(listWithManyBlogs);

    expect(result).toBe(21);
  });
});

describe('favorite Blog', () => {
  test('of empty list is zero', () => {
    const result = listHelper.favoriteBlog(emptyList);

    expect(result).toBe(0);
  });

  test('when list has only one blog, equals that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);

    const expectedResult = {
      title: '18 Best Practices for React',
      author: 'Najm Eddine Zaga',
      likes: 5,
    };

    expect(result).toEqual(expectedResult);
  });

  test('of list with many blogs to equal most liked blog', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs);

    const expectedResult = {
      title: '7 React Projects for Beginners in 2023 (+ Code)',
      author: 'Reed Barger',
      likes: 8,
    };

    expect(result).toEqual(expectedResult);
  });
});
