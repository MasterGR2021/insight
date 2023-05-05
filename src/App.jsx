import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext.jsx';
// Components
import Navigation from './components/Navigation.jsx';
// Pages
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import CreatePost from './Pages/CreatePost.jsx';
import PostPage from './Pages/PostPage.jsx';
import EditPost from './Pages/EditPost.jsx';

const App = () => {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create' element={<CreatePost />} />
            <Route path='/post/:id' element={<PostPage />} />
            <Route path='/edit/:id' element={<EditPost />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
};

export default App;
