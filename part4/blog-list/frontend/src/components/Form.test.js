import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from './Form';
import userEvent from '@testing-library/user-event';

test('Successfully add new Blog', async () => {
  const storedBlogs = [
    {
      title: 'Blog 1',
      author: 'Test Tester',
      url: 'http://www.blogs.com/blog1',
      likes: 3,
      user: {
        username: 'ttester',
        name: 'Test Tester',
      },
      title: 'Blog 2',
      author: 'Test Tester',
      url: 'http://www.blogs.com/blog2',
      likes: 3,
      user: {
        username: 'ttester',
        name: 'Test Tester',
      },
    },
  ];
  const addListEntry = jest.fn();

  const setNotification = jest.fn();
  const setNotificationColor = jest.fn();

  const user = userEvent.setup();

  const { container } = render(
    <Form
      addListEntry={addListEntry}
      storedBlogs={storedBlogs}
      setNotification={setNotification}
      setNotificationColor={setNotificationColor}
    />
  );

  const inputTitle = container.querySelector('#titleInput');
  const inputAuthor = container.querySelector('#authorInput');
  const inputURL = container.querySelector('#urlInput');

  const addBlogButton = container.querySelector('.Form_addButton');

  await user.type(inputTitle, 'Blog 3');
  screen.debug(inputTitle);
  await user.type(inputAuthor, 'Test Tester');
  await user.type(inputURL, 'www.blog.com/blog3');
  await user.click(addBlogButton);

  expect(addListEntry.mock.calls).toHaveLength(1);
  console.log(addListEntry.mock.calls);
  expect(addListEntry.mock.calls[0][0].title).toBe('Blog 3');
  expect(addListEntry.mock.calls[0][0].author).toBe('Test Tester');
  expect(addListEntry.mock.calls[0][0].url).toBe('www.blog.com/blog3');
});
