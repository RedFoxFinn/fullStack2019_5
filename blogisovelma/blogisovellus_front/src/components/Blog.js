import React, {useState} from 'react';
import styles from './Styling.js';
import PropTypes from 'prop-types';

const Blog = ({blogInfo, like, deleteBlog, loggedUser}) => {
  const [visibility, setVisibility] = useState(false);
  if (visibility) {
    return (
      <tr key={blogInfo.id}>
        <td>
          <div className='blog' style={{marginBottom: '0.5em', marginTop: '0.5em'}}>
            <div onClick={() => setVisibility(!visibility)} className='titleAuthor'>
              {blogInfo.title} by {blogInfo.author}
            </div>
            <div className='url'>
              {blogInfo.url}
            </div>
            <div className='likes'>
              liked: {blogInfo.likes} times
            </div>
            {loggedUser === blogInfo.addedBy.userName ?
              <div>
                <button className='likeButton' style={styles().inputStyle1}
                  onClick={(event) => like(event, blogInfo)}>{'Like Blog'}</button>
                <button className='deleteButton' style={styles().inputStyle2} onClick={(event) => deleteBlog(event, blogInfo)}>{'Delete Blog'}</button>
              </div> :
              <button className='likeButton' style={styles().inputStyle1}
                onClick={(event) => like(event, blogInfo)}>{'Like Blog'}</button>}
          </div>
        </td>
      </tr>
    );
  } else {
    return (
      <tr key={blogInfo.id}>
        <td style={{width: '25%'}}>
          <div className='blog' onClick={() => setVisibility(!visibility)}>
            <i>{blogInfo.title}</i> by <i>{blogInfo.author}</i>
          </div>
        </td>
      </tr>
    );
  }
};

Blog.propTypes = {
  loggedUser: PropTypes.string.isRequired,
  like: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  blogInfo: PropTypes.object.isRequired
};

export default Blog;