import React,{useState} from 'react'
import { Container, Typography, TextField, Button, Box, Select,InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddBlog() {
    const [title, setTitle] = useState('');
      const [content, setContent] = useState('');
      const [category, setCategory] = useState('');
      const navigate = useNavigate()

      const handleCreateBlog = async(e)=>{
        e.preventDefault()
        
        axios.post(
            "http://localhost:5000/api/posts",
            { title, content, category }, // Request body
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
            .then((response) => {
              if (response.status === 201) alert("Blog created");
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
              Create Blog
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
                create Blog
              </Button>
            </form>
          </Box>
        </Container>
  )
}

export default AddBlog