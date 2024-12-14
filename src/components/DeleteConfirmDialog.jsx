import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    CircularProgress
  } from '@mui/material';
  
  function DeleteConfirmDialog({ open, user, onClose, onConfirm, isDeleting }) {
    return (
      <Dialog open={open} onClose={() => !isDeleting && onClose()}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {user.first_name} {user.last_name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={onClose} 
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            color="error"
            variant="contained"
            disabled={isDeleting}
            startIcon={isDeleting ? <CircularProgress size={20} /> : null}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  export default DeleteConfirmDialog;