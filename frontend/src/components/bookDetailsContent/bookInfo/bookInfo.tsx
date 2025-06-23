import Rating from "@mui/material/Rating";
import { AddToCartBtn } from "./addToCartBtn/addToCartBtn";
import { ReviewBtn } from "./reviewBtn/reviewBtn";
import { useAuthStore } from "../../../store/authStore";
import { BookInfoProps } from "../../../types/types";

const getReviewWord = (count: number) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return "отзывов";
  }

  if (lastDigit === 1) {
    return "отзыв";
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return "отзыва";
  }

  return "отзывов";
};

export const BookInfo = ({
  title,
  author,
  year,
  price,
  description,
  bookId,
  rating,
}: BookInfoProps) => {
  const { isAuthenticated } = useAuthStore();
  const reviewWord = getReviewWord(rating.count);

  return (
    <div className="w-full md:max-w-[672px] flex flex-col gap-3 md:gap-4">
      <div className="flex flex-col gap-1 md:gap-2">
        <h1 className="text-gray-900 text-xl md:text-2xl font-bold">{title}</h1>
        <div>
          <div className="text-gray-600 text-lg md:text-xl font-normal">
            {author}
          </div>
          <div className="text-gray-500 text-sm md:text-base font-normal">
            Год издания: {year}
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Rating
          name="half-rating-read"
          defaultValue={rating.average}
          precision={0.5}
          readOnly
          size="small"
        />
        <div className="text-gray-600 text-sm md:text-base font-normal">
          {rating.average}
        </div>
        <div className="text-gray-500 text-sm md:text-base font-normal">
          ({rating.count} {reviewWord})
        </div>
      </div>
      <div className="text-xl md:text-2xl font-bold text-black">{price} ₽</div>
      <div className="text-gray-700 text-sm md:text-base font-normal leading-6 md:leading-7">
        {description}
      </div>
      <div className="flex gap-3 md:gap-4 flex-wrap">
        <AddToCartBtn bookId={bookId} />
        {isAuthenticated && <ReviewBtn bookId={bookId} />}
      </div>
    </div>
  );
};
