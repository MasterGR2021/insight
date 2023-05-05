import { Link } from 'react-router-dom';

// stylesheet
import classes from './Blog.module.css';

// moment
import moment from 'moment';

// react-icons
import { AiOutlineClockCircle } from 'react-icons/ai';
const Blog = ({
  _id,
  title,
  summary,
  coverImg,
  content,
  createdAt,
  author,
}) => {
  return (
    <section className={classes.section}>
      <div className={classes.left}>
        <Link to={`/post/${_id}`}>
          <img
            src={`${process.env.REACT_APP_API_URI}/${coverImg}`}
            alt='dummy image'
          />
        </Link>
      </div>
      <div className={classes.right}>
        <span className={classes.category}>Tech</span>
        <Link to={`/post/${_id}`}>
          <h3 className={classes.title}>{title}</h3>
        </Link>
        <div className={classes.info}>
          <p className={classes.author}>{author.name}</p>
          <AiOutlineClockCircle />
          <span className={classes.time}>
            {moment(createdAt).format('MMM Do YYYY')}
          </span>
        </div>
        <p className={classes.summary}>{summary}</p>
      </div>
    </section>
  );
};

export default Blog;
