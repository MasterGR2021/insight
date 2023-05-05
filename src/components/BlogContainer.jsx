import { useEffect, useState } from 'react';
import Blog from './Blog.jsx';

// stylesheet
import classes from './BlogContainer.module.css';

// toastify
import { Flip, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogContainer = () => {
  const [posts, setPosts] = useState([]);
  let counter = 0;
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/post`);
      const json = await response.json();
      setPosts(json);
      if (counter < 1) {
        const id = toast.loading('Loading Feed, Please Wait...');
        if (response.status === 200) {
          toast.update(id, {
            render: 'Success',
            type: 'success',
            isLoading: false,
            autoClose: 1000,
            position: 'top-right',
            closeOnClick: true,
          });
          counter += 1;
        } else {
          toast.update(id, {
            render: 'LogIn Failed!',
            type: 'error',
            isLoading: false,
            autoClose: 1000,
            position: 'top-right',
            closeOnClick: true,
          });
          counter += 1;
        }
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className={classes.blogContainer}>
      {posts.length > 0 &&
        posts.map((post) => <Blog key={post._id} {...post} />)}
      <ToastContainer transition={Flip} autoClose={3000} limit={1} />
    </div>
  );
};

export default BlogContainer;
