import { useState } from "react";
import Button from "@mui/material/Button";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { ConfirmDialog } from "../../../ui/confirmDialog/confirmDialog";
import { CustomModal } from "../../../ui/modal/modal";
import { submitReview } from "../../../../api/api";

export const ReviewBtn = ({ bookId }: { bookId: string }) => {
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [review, setReview] = useState({ rating: 0, comment: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleReviewSubmit = async () => {
    try {
      if (review.rating === 0) {
        throw new Error("Пожалуйста, поставьте оценку");
      }
      if (!review.comment.trim()) {
        throw new Error("Пожалуйста, напишите отзыв");
      }
      await submitReview(bookId, review.rating, review.comment);
      setIsReviewDialogOpen(false);
      setTimeout(() => setIsSuccessModalOpen(true), 1000)
      setReview({ rating: 0, comment: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Ошибка при отправке отзыва";
      setErrorMessage(message);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "white",
          color: "black",
          maxWidth: "220px",
          border: "1px solid black",
          width: "100%",
          padding: "8px 12px",
          borderRadius: 1,
          textTransform: "none",
          display: "flex",
          gap: "7px",
          "&:hover": {
            backgroundColor: "#f3eeee",
          },
        }}
        onClick={() => setIsReviewDialogOpen(true)}
      >
        <ChatBubbleIcon fontSize="small" />
        <span className="text-sm md:text-base">Оставить отзыв</span>
      </Button>
      <ConfirmDialog
        open={isReviewDialogOpen}
        title="Оставить отзыв"
        content={
          <div className="flex flex-col gap-4">
            <Rating
              name="review-rating"
              value={review.rating}
              onChange={(_, newValue) =>
                setReview((prev) => ({ ...prev, rating: newValue || 0 }))
              }
              precision={0.5}
              size="large"
            />
              <TextField
              label="Ваш отзыв"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={review.comment}
              onChange={(e) =>
                setReview((prev) => ({ ...prev, comment: e.target.value }))
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                  "&.Mui-focused": {
                    color: "black",
                  },
                },
              }}
            />
            {errorMessage && (
              <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
            )}
          </div>
        }
        confirmText="Отправить отзыв"
        onConfirm={handleReviewSubmit}
        onCancel={() => setIsReviewDialogOpen(false)}
      />
      <CustomModal
        open={isSuccessModalOpen}
        message="Спасибо за ваш отзыв!"
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </>
  );
};
