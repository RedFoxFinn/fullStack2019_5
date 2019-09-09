import React from 'react';
import PropTypes from 'prop-types';
import styles from './Styling.js';

const BlogForm = ({
  blogFormVisibility,
  blogTitle, blogAuthor,
  blogUrl, blogLikes,
  handleBlogFormVisibility,
  handleSubmitBlog}) => {
  return blogFormVisibility ?
    <div>
      <h4>Blog submission</h4>
      <form id='blogForm' onSubmit={(event) => handleSubmitBlog(event)}>
        <input style={styles().inputStyle1} required autoComplete='false' type='text'
          placeholder='Blog title' {...blogTitle}/>
        <input style={styles().inputStyle2} required autoComplete='false' type='text'
          placeholder='Blog author' {...blogAuthor}/>
        <input style={styles().inputStyle1} required autoComplete='false' type='text'
          placeholder='Blog url' {...blogUrl}/>
        <input style={styles().inputStyle2} autoComplete='false' type='number'
          placeholder='Blog likes' {...blogLikes}/>
        <input style={styles().inputStyle1} type='submit'/>
        <button style={styles().inputStyle2} onClick={() => handleBlogFormVisibility()}>{'Cancel'}</button>
      </form>
    </div> :
    <button style={styles().inputStyle1} onClick={() => handleBlogFormVisibility()}>{'Add blog'}</button>;
};

BlogForm.propTypes = {
  blogFormVisibility: PropTypes.bool.isRequired,
  handleBlogFormVisibility: PropTypes.func.isRequired,
  handleSubmitBlog: PropTypes.func.isRequired
};

export default BlogForm;