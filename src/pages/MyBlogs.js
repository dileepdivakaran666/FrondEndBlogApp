import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";

function MyBlog() {
  const [blogs, setBlogs] = useState([]);
//   const userId = localStorage.getItem("userId"); // Assuming you store userId after login

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/myblogs`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {setBlogs(response.data)
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Grid sx={{margin:3}} container spacing={2}>
      {blogs.length === 0 ? (
        <Typography variant="h5">You haven't posted any blogs yet.</Typography>
      ) : (
        blogs.map((blog) => (
          <Grid size={6} key={blog._id}>
            <Card>
              <CardContent>
                <Typography variant="h4">{blog.title}</Typography>
                <Typography variant="body"> {blog.content.split(/\s+/).slice(0, 10).join(" ")}...</Typography>
                <Typography variant="body2" sx={{marginTop:2}}>Author: {blog.name}</Typography>
                <Button sx={{marginTop:0, padding:0}} component={Link} to="/detailed" state={{ blog, logged:true }}>
                  Read More...
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default MyBlog;
