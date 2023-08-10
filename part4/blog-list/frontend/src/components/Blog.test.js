import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders only blog title', () => {
  const index = 1;

  const blog = {
    title: 'This is a blog about testing',
    author: 'Test Tester',
    url: 'http://www.blogs.com/testing101',
    likes: 3,
    user: {
      username: 'ttester',
      name: 'Test Tester',
    },
  };

  const addLike = jest.fn();

  const deleteBlog = jest.fn();

  const { container } = render(
    <Blog index={index} blog={blog} deleteBlog={deleteBlog} addLike={addLike} />
  );

  const titleDiv = container.querySelector('.Blog_title');
  const detailsDiv = container.querySelector('.Blog_details');

  expect(titleDiv).toHaveTextContent('This is a blog about testing');
  expect(titleDiv).not.toHaveStyle('display: none');
  expect(detailsDiv).toHaveStyle('display: none');
  expect(detailsDiv.content).not.toBe('Likes');
});

test('clicking "View"-button displays all the blog details', async () => {
  const index = 1;

  const blog = {
    title: 'This is a blog about testing',
    author: 'Test Tester',
    url: 'http://www.blogs.com/testing101',
    likes: 3,
    user: {
      username: 'ttester',
      name: 'Test Tester',
    },
  };

  const addLike = jest.fn();

  const deleteBlog = jest.fn();

  const { container } = render(
    <Blog index={index} blog={blog} deleteBlog={deleteBlog} addLike={addLike} />
  );

  const user = userEvent.setup();
  const viewButton = container.querySelector('.Blog_toggleButton');
  expect(viewButton).toHaveTextContent('View');

  await user.click(viewButton);

  const div = container.querySelector('.Blog_details');
  const authorElement = container.querySelector('.Blog_author');
  const urlElement = container.querySelector('.Blog_url');
  const userElement = container.querySelector('.Blog_user');
  const likesElement = container.querySelector('.Blog_likes');

  expect(div).not.toHaveStyle('display: none');
  expect(authorElement).toHaveTextContent('Test Tester');
  expect(urlElement).toHaveTextContent('http://www.blogs.com/testing101');
  expect(userElement).toHaveTextContent('Test Tester');
  expect(likesElement).toHaveTextContent(3);
  expect(viewButton).toHaveTextContent('Hide');
});

test('clicking the like button twice calls event handler twice', async () => {
  const index = 1;

  const blog = {
    title: 'This is a blog about testing',
    author: 'Test Tester',
    url: 'http://www.blogs.com/testing101',
    likes: 3,
    user: {
      username: 'ttester',
      name: 'Test Tester',
    },
  };

  const addLike = jest.fn();

  const deleteBlog = jest.fn();

  const { container } = render(
    <Blog index={index} blog={blog} deleteBlog={deleteBlog} addLike={addLike} />
  );

  const user = userEvent.setup();
  const viewButton = container.querySelector('.Blog_toggleButton');
  expect(viewButton).toHaveTextContent('View');

  await user.click(viewButton);

  const likeButton = container.querySelector('.Blog_likeButton');
  expect(likeButton).toHaveTextContent('Like');

  await user.click(likeButton);
  await user.click(likeButton);
  expect(addLike.mock.calls).toHaveLength(2);
});
