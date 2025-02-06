import React,{useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from '@mui/material';
import axios from 'axios';

function DetailedPage() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const blog = location.state?.blog; // Access the passed blog object
  const createDate = blog.createdAt?.split('T')[0]
  const updatedate = blog.updatedAt?.split('T')[0]
  const isLoggedIn = location.state?.logged

  const handleUpdate = () => {
    // Navigate to the update page and pass the blog data via state
    navigate(`/update-blog`, { state: { blog } });
  };

  if (!blog) {
    return <Typography variant="h5">No blog details found.</Typography>;
  }


    // Open the confirmation dialog
    const handleOpen = () => {
        setOpen(true);
    };

    // Close the dialog
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
      try {
          await axios.delete(`https://backendblogapp-65qh.onrender.com/api/posts/${blog._id}`).then(response=>{if (response.status === 200) alert("Blog Deleted");
            handleClose(); // Close the dialog after deletion
            navigate('/')
          })
      } catch (error) {
          console.error("Error deleting blog:", error);
      }
  };

  return (
    <Card sx={{ margin:10, padding: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h3">{blog.title}</Typography>
        <Typography sx={{marginTop:3}} variant="body1">{blog.content}</Typography>
        <Typography sx={{marginTop:3}} variant="body2">Author: <Box component="span" sx={{ color: "blue" }}>{blog.name}</Box></Typography>
        <Typography sx={{marginTop:2}} variant="body2">Create Date: <Box component="span" sx={{ color: "blue" }}>{createDate}</Box></Typography>
        {blog.updatedAt&&<Typography sx={{marginTop:3}} variant="body2">Update Date: <Box component="span" sx={{ color: "blue" }}>{updatedate}</Box></Typography>}
        {isLoggedIn&&
        <>
        <Button variant="contained" sx={{margin: 3}} onClick={handleUpdate}>Update</Button>
        <Button variant="contained" color="error"  onClick={handleOpen}>Delete</Button>
        <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this blog? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>}
      </CardContent>
    </Card>
  );
}

export default DetailedPage;
