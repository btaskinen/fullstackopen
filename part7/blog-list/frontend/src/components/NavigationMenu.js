import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationMenu.css';

const NavigationMenu = () => {
  const [selected, setSelected] = useState(true);

  const blogsNav = selected ? 'selected' : '';
  const usersNav = selected ? '' : 'selected';

  const handleClick = () => {
    setSelected((prev) => !prev);
  };
  return (
    <div className="NavigationMenu">
      <Link
        onClick={handleClick}
        className={`NavigationMenu_link ${blogsNav}`}
        to="/"
      >
        Blogs
      </Link>
      <Link
        onClick={handleClick}
        className={`NavigationMenu_link ${usersNav}`}
        to="Users"
      >
        Users
      </Link>
    </div>
  );
};

export default NavigationMenu;
