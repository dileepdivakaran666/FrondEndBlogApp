import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { Card, CardContent, Typography, Button} from '@mui/material';
import Grid from '@mui/material/Grid2';

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(response => setBlogs(response.data))
      .catch(error => console.error(error));
  }, []);

  

  return (
    <Grid container spacing={2}>
      {blogs.map(blog => (
        <Grid size={6} key={blog._id}>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{margin: 2}} component="div">
                {blog.title}
              </Typography>
              <Typography variant="body" sx={{margin: 2}} component="div"> {blog.content.split(/\s+/).slice(0, 20).join(" ")}...</Typography>
              <Typography variant="body2" sx={{margin: 2}}>
                author: {blog.name}
              </Typography>
              <Button onClick={() => navigate('/detailed', { state: { blog } })}>Readmore ...</Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Dashboard;