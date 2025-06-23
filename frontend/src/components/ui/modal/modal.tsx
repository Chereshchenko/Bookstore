import { ModalProps } from "../../../types/types";
import { Modal } from "@mui/material";
import Button from "@mui/material/Button";

export const CustomModal = ({ open, message, onClose }: ModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 10px",
      }}
    >
      <div className="bg-white p-6 rounded-lg outline-none max-w-3xl w-full text-center">
        <p className="mb-5">{message}</p>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            backgroundColor: "black",
            color: "white",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Закрыть
        </Button>
      </div>
    </Modal>
  );
};
