import React from 'react';
import PropType from 'prop-types';

const Comments = ({ blog }) => {
  return (
    <div className="Blog_comments">
      <h3>Comments</h3>
      {blog.comments.map((comment, index) => {
        const backgroundColor = index % 2 === 0 ? 'dark' : 'light';
        return (
          <div key={comment.id} className={`Blog_comment ${backgroundColor}`}>
            {comment.comment}
          </div>
        );
      })}
    </div>
  );
};

Comments.propTypes = {
  blog: PropType.object.isRequired,
};

export default Comments;
