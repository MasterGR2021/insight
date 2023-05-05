import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';

// react-icons
import { AiOutlineMenu, AiOutlinePlus } from 'react-icons/ai';
import { IoMdExit } from 'react-icons/io';
import { GrClose } from 'react-icons/gr';

// stylesheet
import classes from './Navigation.module.css';

const Navigation = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/profile`, {
        credentials: 'include',
      });
      const json = await response.json();
      // console.log(json.name);
      setUserInfo(json);
    };
    fetchData();
  }, [setUserInfo]);

  const logout = () => {
    fetch(`${process.env.REACT_APP_API_URI}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setUserInfo(null);
  };

  const username = userInfo?.name;

  return (
    <>
      <div>
        <div
          className={`${overlay ? classes.overlayOpen : classes.overlayClose}`}
        ></div>
        <header className={`${classes.header}`}>
          <div className='brand'>
            <Link to='/'>
              <h1>Insight</h1>
            </Link>
          </div>
          <nav className={classes.navbar}>
            <ul
              className={`${navOpen ? classes.navOpen : classes.navClose}  ${
                classes.navlinks
              }`}
            >
              <div
                className={classes.closeMenu}
                onClick={() => {
                  setNavOpen(false);
                  setOverlay(false);
                }}
              >
                <GrClose />
              </div>
              <li>{username && <p>Hello, {username}</p>}</li>
              {!username && (
                <li>
                  <Link to='/login'>
                    <button className={`btn-secondary`}>Login</button>
                  </Link>
                  <Link to='/register'>
                    <button className={`btn-primary`}>Register</button>
                  </Link>
                </li>
              )}
              {username && (
                <li>
                  <Link to='/create' tabIndex='-1'>
                    <button className={`btn-primary cta`}>
                      {' '}
                      <AiOutlinePlus style={{ fontSize: '1rem' }} /> Create{' '}
                    </button>
                  </Link>
                  <a href=''>
                    <button
                      className={`btn-secondary cta-secondary`}
                      onClick={logout}
                    >
                      <IoMdExit style={{ fontSize: '1rem' }} />
                      Logout
                    </button>
                  </a>
                </li>
              )}
            </ul>
            <div
              className={classes.menu}
              onClick={() => {
                setNavOpen(true);
                setOverlay(true);
              }}
            >
              <AiOutlineMenu />
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};

export default Navigation;
