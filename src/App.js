// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import DetailedPage from './pages/DetailedPage';
import MyBlog from './pages/MyBlogs';
import AddBlog from './components/AddBlog';
import UpdateBlog from './components/UpdateBlog'


function App() {
  return (
    <>
    <Header/>
      <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/detailed" element={<DetailedPage/>}/>
          <Route path="/myblog" element={<MyBlog/>}/>
          <Route path='/addblog' element={<AddBlog/>}/>
          <Route path='/update-blog' element={<UpdateBlog/>}/>
        </Routes>
    </>
      
  );
}

export default App;
