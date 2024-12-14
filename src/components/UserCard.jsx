import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box
  } from '@mui/material';
  
  function UserCard({ user, onEdit, onDelete }) {
    return (
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {user.first_name} {user.last_name}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {user.email}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => onEdit(user)}
              sx={{ mr: 1 }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete(user)}
            >
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }
  
  export default UserCard;