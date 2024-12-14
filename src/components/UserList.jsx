import { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, Pagination } from '@mui/material';
import UserCard from './UserCard';
import UserEditModal from './UserEditModal';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import useUsers from '../hooks/useUsers';

function UserList() {
  const {
    users,
    page,
    totalPages,
    isLoading,
    setPage,
    fetchUsers,
    handleDeleteUser,
    updateLocalUser
  } = useUsers();

  const [editUser, setEditUser] = useState(null);
  const [deleteUserData, setDeleteUserData] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleCloseEdit = (updatedUser) => {
    if (updatedUser) {
      updateLocalUser(updatedUser);
    }
    setEditUser(null);
  };

  const handleDelete = (user) => {
    setDeleteUserData(user);
  };

  const handleConfirmDelete = async () => {
    if (!deleteUserData) return;
    
    setIsDeleting(true);
    try {
      await handleDeleteUser(deleteUserData.id);
    } catch (error) {
      // Error is already handled in useUsers hook
    } finally {
      setIsDeleting(false);
      setDeleteUserData(null);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Users
      </Typography>
      <Grid container spacing={4}>
        {users.map((user) => (
          <Grid item key={user.id} xs={12} sm={6} md={4}>
            <UserCard
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      </Box>

      {editUser && (
        <UserEditModal user={editUser} onClose={handleCloseEdit} />
      )}

      {deleteUserData && (
        <DeleteConfirmDialog
          open={true}
          user={deleteUserData}
          onClose={() => setDeleteUserData(null)}
          onConfirm={handleConfirmDelete}
          isDeleting={isDeleting}
        />
      )}
    </Container>
  );
}

export default UserList;