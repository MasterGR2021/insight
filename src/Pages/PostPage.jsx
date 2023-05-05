import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import { Link, useParams } from 'react-router-dom';

// Stylesheet
import classes from './PostPage.module.css';

// moment
import moment from 'moment';

// react-icons
import { AiOutlineClockCircle, AiOutlineEdit } from 'react-icons/ai';
import { Interweave } from 'interweave';

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    // console.log(params);
    const fetchPost = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/post/${id}`
      );
      const json = await response.json();
      setPostInfo(json);
    };
    fetchPost();
  }, [id]);

  return (
    <div className={`container ${classes.postContainer}}`}>
      {postInfo && (
        <div>
          <div className={classes.editBtnContainer}>
            {userInfo.id === postInfo.author._id && (
              <Link
                to={`/edit/${postInfo._id}`}
                className={`${classes.editBtn} btn-secondary`}
              >
                <AiOutlineEdit />
                Edit Post
              </Link>
            )}
          </div>
          <div className={classes.imgContainer}>
            <img
              src={`${process.env.REACT_APP_API_URI}/${postInfo.coverImg}`}
              alt='cover image'
            />
          </div>
          <h1 className={classes.title}>{postInfo.title}</h1>
          <div className={classes.authorContainer}>
            <span
              className={classes.author}
            >{`By ${postInfo.author.name}`}</span>
            <AiOutlineClockCircle />
            <span className={classes.time}>
              {moment(postInfo.createdAt).format('MMM Do YYYY')}
            </span>
          </div>
          <div className={classes.content}>
            <Interweave content={postInfo.content} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPage;
