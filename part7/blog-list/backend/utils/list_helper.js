// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  console.log(blogs);
  const findMaxLikes = (prevBlog, CurrBlog) => {
    return prevBlog.likes > CurrBlog.likes ? prevBlog : CurrBlog;
  };

  console.log(blogs.length);

  if (blogs.length === 0) {
    return 0;
  } else {
    const mostLikedBlog = blogs.reduce(findMaxLikes, blogs[0]);

    return {
      title: mostLikedBlog.title,
      author: mostLikedBlog.author,
      likes: mostLikedBlog.likes,
    };
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
