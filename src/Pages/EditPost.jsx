import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from '../components/Editor.jsx';

// Stylesheet
import classes from './CreatePost.module.css';

// toastify
import { Flip, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/post/${id}`
      );
      const json = await response.json();
      setPostInfo(json);
      setTitle(json.title);
      setSummary(json.summary);
      setContent(json.content);
    };
    fetchPost();
  }, [id]);

  const createNewPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', file[0]);

    const id_toast = toast.loading('Updating Post...');

    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/post/${id}`,
      {
        method: 'POST',
        body: data,
        credentials: 'include',
      }
    );

    if (response.status === 200) {
      toast.update(id, {
        render: 'Success! Redirecting...',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        position: 'top-right',
        closeOnClick: true,
      });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setTimeout(() => {
        navigate('/');
      }, 2000);
      toast.update(id_toast, {
        render: 'Something went wrong!',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
        position: 'top-right',
        closeOnClick: true,
      });
    }
  };

  return (
    <div className='container'>
      <h1 className={classes.heading}>Edit Post</h1>
      {postInfo && (
        <div>
          <form className={classes.form} onSubmit={createNewPost}>
            <label htmlFor='title'>Title</label>
            <input
              required
              type='text'
              id='title'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Insert Title Here'
            />

            <label htmlFor='summary'>Summary</label>
            <input
              required
              type='text'
              name='summary'
              id='summary'
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder='Write a Short Summary about your Article.'
            />

            <label htmlFor='img'>Cover Image</label>
            <img
              src={`${process.env.REACT_APP_API_URI}/${postInfo.coverImg}`}
              alt='uploaded image'
            />
            <input
              type='file'
              name='img'
              id='img'
              accept='image/*'
              onChange={(e) => setFile(e.target.files)}
            />

            <label htmlFor='content'>Content</label>
            <Editor content={content} setContent={setContent} />
            <button className={`${classes.createBtn} btn-primary`}>
              Edit Post
            </button>
          </form>
        </div>
      )}
      <ToastContainer transition={Flip} autoClose={3000} limit={1} />
    </div>
  );
};

export default EditPost;
