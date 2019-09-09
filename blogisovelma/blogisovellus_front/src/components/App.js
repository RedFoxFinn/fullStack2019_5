import React, {useState, useEffect} from 'react';

import login from '../services/Login.js';
import serverConnection from '../services/ServerConnection.js';
import Blog from './Blog.js';
import LoginForm from './LoginForm.js';
import BlogForm from './BlogForm.js';

import styles from './Styling.js';
import {useField} from '../hooks';
//import SimpleBlog from './SimpleBlog';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const newBlogTitle = useField('text');
  const newBlogAuthor = useField('text');
  const newBlogUrl = useField('text');
  const newBlogLikes = useField('number');
  const [notification, setNotification] = useState(null);
  const userName = useField('text');
  const pw = useField('password');
  const [loginFormState, setLoginFormState] = useState(false);
  const [blogFormState, setBlogFormState] = useState(false);
  const [user, setUser] = useState(null);
  const [sorting, setSorting] = useState(null);

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('fs19_blogUser');

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      serverConnection.setToken(user.token);
      setNotification('info: session restored');
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }, []);

  const getBlogs = () => {
    serverConnection.getBlogs().then(res => {
      if (res.status !== 200) {
        setNotification('error: can not acquire blogs');
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      } else {
        setBlogs(res.data);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    login({userName: userName.value, pw: pw.value}).then(res => {
      setUser(res.data);
      window.localStorage.setItem('fs19_blogUser', JSON.stringify(res.data));
      serverConnection.setToken(res.data.token);
      document.getElementById('loginForm').reset();
      setNotification('info: login successful');
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }).catch(() => {
      document.getElementById('passwordField').reset();
      setNotification('error: incorrect username or password');
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    });
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.removeItem('fs19_blogUser');
    setNotification('info: logged out');
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleSubmitBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: newBlogTitle.value,
      author: newBlogAuthor.value,
      url: newBlogUrl.value,
      likes: newBlogLikes.value
    };
    serverConnection.setBlog(newBlog).then(() => {
      document.getElementById('blogForm').reset();
      getBlogs();
    }).catch(err => {
      if (err.status === 400) {
        setNotification('error: blog addition failed');
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      } else if (err.status === 401) {
        setNotification('error: authentication error');
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    });
  };

  const handleLoginVisibility = () => {
    setLoginFormState(!loginFormState);
  };
  const handleBlogFormVisibility = () => {
    setBlogFormState(!blogFormState);
  };
  const handleLikeBlog = (event, blog) => {
    event.preventDefault();
    serverConnection.likeBlog(blog).then(() => {
      getBlogs();
    }).catch(err => {
      console.error(err);
    });
  };
  const logged = () => {
    return (
      <div>
        <h4 style={{display: 'inline-block'}}>Logged: {user.name}</h4>
        <button style={styles().logoutStyle}
          onClick={event => handleLogout(event)}>Logout</button>
      </div>
    );
  };
  const renderNotification = () => {
    if (notification && notification.startsWith('error:')) {
      return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <p style={{
            display: 'flex',
            width: '75%',
            justifyContent: 'center',
            color: 'red',
            border: '1px solid red'
          }}>{notification}</p>
        </div>
      );
    } else if (notification && notification.startsWith('info:')) {
      return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <p style={{display: 'flex', width: '75%', justifyContent: 'center',
            color: 'green', border: '1px solid green'}}>{notification}</p>
        </div>
      );
    } else {
      return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <p style={{display: 'flex', width: '75%', justifyContent: 'center',
            color: 'transparent', border: '1px solid transparent'}}>{'  '}</p>
        </div>
      );
    }
  };
  const handleSorting = (event) => {
    event.preventDefault();
    switch (sorting) {
    case null:
      setSorting('ascending');
      blogs.sort((a, b) => a.likes - b.likes);
      break;
    case 'ascending':
      setSorting('descending');
      blogs.sort((a, b) => b.likes - a.likes);
      break;
    case 'descending':
      setSorting('ascending');
      blogs.sort((a, b) => a.likes - b.likes);
      break;
    default:
      setSorting('descending');
      blogs.sort((a, b) => b.likes - a.likes);
      break;
    }
  };
  const handleDelete = (event, blog) => {
    event.preventDefault();
    if (window.confirm(`You are about to remove blog ${blog.title} from the list. Proceed?`)) {
      serverConnection.deleteBlog(blog).then(() => {
        window.alert(`Blog ${blog.title} was removed.`);
        getBlogs();
      }).catch(() => {
        window.alert(`There was an error, blog ${blog.title} was not removed.`);
      });
    } else {
      window.alert(`Blog ${blog.title} was not removed.`);
    }
  };
  const sortingButton = () => {
    switch (sorting) {
    case null:
      return (
        <button style={styles().inputStyle1} onClick={(event) => handleSorting(event)}>ascending</button>
      );
    case 'ascending':
      return (
        <button style={styles().inputStyle1} onClick={(event) => handleSorting(event)}>descending</button>
      );
    case 'descending':
      return (
        <button style={styles().inputStyle1} onClick={(event) => handleSorting(event)}>ascending</button>
      );
    default:
      return (
        <button style={styles().inputStyle1} onClick={(event) => handleSorting(event)}>descending</button>
      );
    }
  };
  const RenderBlogs = () => {
    const noBlogsEntry = {
      title: 'no blogs found',
      author: 'webmaster',
      url: 'nope',
      likes: 0,
      id: 'noBlogsEntry'
    };
    return (
      <table style={styles().tableStyle}>
        <thead>
          <tr>
            <td><b>Blogs</b> (open/close blog info by clicking the name):</td>
          </tr>
          <tr>
            <td>sort blogs by likes {sortingButton()}</td>
          </tr>
        </thead>
        <tbody style={styles().tableBodyStyle}>
          {blogs.length > 0 ?
            blogs.map((blog) => {
              /*return <SimpleBlog key={blog.id} blogInfo={blog} clicker={handleLikeBlog}/>;*/
              return <Blog key={blog.id} blogInfo={blog} like={handleLikeBlog}
                deleteBlog={handleDelete} loggedUser={user.userName}/>;
            }) :
            <Blog key='noBlogsEntry' blogInfo={noBlogsEntry}
              like={handleLikeBlog} deleteBlog={handleDelete}
              loggedUser={user.userName}/>}
        </tbody>
      </table>
    );
  };
  return (
    <div>
      <div style={{outline: '1px solid transparent', display: 'flex', justifyContent: 'space-between'}}>
        <h2>Saved blogs</h2>
        {user !== null && logged()}
      </div>
      {renderNotification()}
      <div style={{display: 'flex', outline: '1px solid transparent'}}>
        {
          user === null ?
            <LoginForm loginVisibility={loginFormState}
              userName={userName} pw={pw}
              handleLogin={handleLogin}
              handleLoginVisibility={handleLoginVisibility}/> :
            <BlogForm blogFormVisibility={blogFormState}
              blogTitle={newBlogTitle} blogAuthor={newBlogAuthor}
              blogUrl={newBlogUrl} blogLikes={newBlogLikes}
              handleBlogFormVisibility={handleBlogFormVisibility}
              handleSubmitBlog={handleSubmitBlog}
            />
        }
      </div>
      {user !== null &&
      <div>
        {RenderBlogs()}
      </div>
      }
    </div>
  );
};

export default App;
