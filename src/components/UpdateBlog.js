import React,{useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Select,InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

function UpdateBlog() {
  // const { _id } = useParams(); // Get the blog ID from the URL
  const location = useLocation(); // Access the passed blog data
  const navigate = useNavigate()
  

    const [id,setId] = useState('')
    const [title, setTitle] = useState('');
      const [content, setContent] = useState('');
      const [category, setCategory] = useState('');

      useEffect(() => {
        if (location.state?.blog) {
          const { _id, title, content, category } = location.state.blog;
          setId(_id)
          setTitle(title);
          setContent(content);
          setCategory(category);
        }
      }, [location.state]);

      const handleCreateBlog = async(e)=>{
        e.preventDefault()
        console.log('Signup Data:', { title, content, category });
        axios.put(`http://localhost:5000/api/posts/${id}`,
            { title, content, category }, // Request body
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
            .then((response) => {
              if (response.status === 200) alert("Blog Updated");
              navigate('/')
            })


            .catch((err) => {
              console.error("Error creating blog:", err.response?.data || err.message);
              alert(err.response?.data?.message || "An error occurred");
            });
      }

  return (
    <Container maxWidth="sm">
          <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Update Blog
            </Typography>
            <form onSubmit={handleCreateBlog}>
              <TextField
                label="Title"
                type="text"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <TextField
                label="Content"
                type="text"
                fullWidth
                margin="normal"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                fullWidth
                margin="normal"
                value={category}
                label="Category"
                onChange={(e)=>setCategory(e.target.value)}
                required
              >
                <MenuItem value="" disabled>Select a category</MenuItem> 
                <MenuItem value={"Adventure"}>Adventure</MenuItem>
                <MenuItem value={"Technology"}>Technology</MenuItem>
                <MenuItem value={"fasion"}>fasion</MenuItem>
              </Select>

              <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
                Update Blog
              </Button>
            </form>
          </Box>
        </Container>
  )
}

export default UpdateBlog