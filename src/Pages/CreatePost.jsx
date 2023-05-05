import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import Editor from '../components/Editor.jsx';

// Stylesheet
import classes from './CreatePost.module.css'

// toastify
import {Flip, toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');
    const navigate = useNavigate();

    const createNewPost = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', file[0]);

        const id = toast.loading("Creating Post...")

        const response = await fetch(`${process.env.REACT_APP_API_URI}/post`, {
            method: 'POST',
            body: data,
            credentials: 'include'
        })

        const json = await response.json();

        if(response.status === 200) {
            toast.update(id, { render: "Success! Redirecting...", type: "success", isLoading: false, autoClose: 3000, position: "top-right", closeOnClick: true });
            setTimeout(() => {
                navigate('/')
            }, 2000);
        }
        else {
            setTimeout(() => {
                navigate('/')
            }, 2000);
            toast.update(id, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000, position: "top-right", closeOnClick: true });
        }
    }

    return <div className='container'>
        <h1 className={classes.heading}>Create a New Post</h1>
        <form className={classes.form} onSubmit={createNewPost}>
            <label htmlFor="title">Title</label>
            <input required type='text' id='title' name='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Insert Title Here'/>

            <label htmlFor="summary">Summary</label>
            <input required type="text" name="summary" id="summary" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder='Write a Short Summary about your Article.'/>

            <label htmlFor="img">Image</label>
            <input required type="file" name="img" id="img" accept='image/*' onChange={(e) => setFile(e.target.files)}/>

            <label htmlFor="content">Content</label>
            <Editor content={content} setContent={setContent}/>
            <button className={`${classes.createBtn} btn-primary`}>Create Post</button>
        </form>
        <ToastContainer transition={Flip} autoClose={3000} limit={1}/>
    </div>
}

export default CreatePost;