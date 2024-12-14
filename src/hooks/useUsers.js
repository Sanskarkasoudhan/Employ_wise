import { useState, useCallback } from 'react';
import { getUsers, deleteUser } from '../services/api';
import { toast } from 'react-toastify';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getUsers(page);
      setUsers(response.data);
      setTotalPages(response.total_pages);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error('Fetch users error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  const handleDeleteUser = useCallback(async (id) => {
    try {
      await deleteUser(id);
      // Optimistically update the UI
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Delete user error:', error);
      // If delete fails, refresh the list to ensure UI is in sync
      fetchUsers();
      throw error;
    }
  }, [fetchUsers]);

  const updateLocalUser = useCallback((updatedUser) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
  }, []);

  return {
    users,
    page,
    totalPages,
    isLoading,
    setPage,
    fetchUsers,
    handleDeleteUser,
    updateLocalUser
  };
}

export default useUsers;