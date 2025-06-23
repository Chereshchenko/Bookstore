import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { ConfirmDialogProps } from "../../../types/types";

export const ConfirmDialog = ({
  open,
  title,
  content,
  confirmText = "Подтвердить",
  cancelText = "Отмена",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  return (
    <Dialog 
      open={open} 
      onClose={onCancel}
      maxWidth="sm" 
      fullWidth 
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions sx={{display: "flex", flexWrap: "wrap"}}>
        <Button 
          onClick={onCancel}
          variant="outlined"
          sx={{
            color: "black",
            borderColor: "black",
            borderRadius: "4px",
            textTransform: "none",
            fontSize: "0.875rem",
            "&:hover": {
              borderColor: "#333",
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            }
          }}
        >
          {cancelText}
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "4px",
            textTransform: "none",
            fontSize: "0.875rem",
            "&:hover": {
              backgroundColor: "#333",
            },
            "&:focus": {
              backgroundColor: "#333",
            }
          }}
          autoFocus
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};