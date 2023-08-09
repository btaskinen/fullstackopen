import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders only blog title', () => {
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

  const { container } = render(<Blog blog={blog} />);

  screen.debug();

  const titleDiv = container.querySelector('.Blog_title');
  const detailsDiv = container.querySelector('.Blog_details');

  expect(titleDiv).toHaveTextContent('This is a blog about testing');
  expect(titleDiv).not.toHaveStyle('display: none');
  expect(detailsDiv).toHaveStyle('display: none');
  expect(detailsDiv.content).not.toBe('Likes');
});
