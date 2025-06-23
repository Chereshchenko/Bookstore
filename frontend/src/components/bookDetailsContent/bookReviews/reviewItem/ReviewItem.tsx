import { Rating } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Review } from "../../../../types/types";

export const ReviewItem = ({ review }: { review: Review }) => (
  <div className="rounded-lg bg-white shadow-sm">
    <div className="p-4 md:p-6 flex flex-col gap-3 md:gap-4">
      <div className="flex flex-col md:flex-row md:justify-between gap-3 md:gap-0">
        <div className="flex gap-3 md:gap-4">
          <AccountCircle sx={{ fontSize: 40 }} />
          <div>
            <div className="text-base font-medium text-black">
              {review.user_name}
            </div>
            <Rating
              value={review.rating}
              precision={0.5}
              readOnly
              size="small"
            />
          </div>
        </div>
        <div className="text-sm md:text-base font-normal text-gray-500">
          {review.date}
        </div>
      </div>
      <div className="text-sm md:text-base font-normal text-gray-600">
        {review.text}
      </div>
    </div>
  </div>
);
