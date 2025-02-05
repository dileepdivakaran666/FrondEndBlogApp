import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';


function Header() {

  const {isLoggedIn, handleLogout} = useAuth()
  const navigate = useNavigate()


  return (
    <div>
        <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,cursor: "pointer" }} onClick={()=>navigate('/')}>
            Zoople Blog App
          </Typography>
          
          
          {
            isLoggedIn? <>
            <Button color="inherit" component={Link} to="/addblog">AddBlog</Button>
            <Button color="inherit" component={Link} to="/myblog">MyBlogs</Button>
            <Button color="inherit" onClick={handleLogout}>LogOut</Button>
            </>
            :<>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
          </>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header