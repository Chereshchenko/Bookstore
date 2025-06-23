import { useState, useEffect } from "react";
import { ReviewsResponse } from "../../../types/types";
import { fetchBookReviews } from "../../../api/api";
import { ReviewItem } from "./reviewItem/ReviewItem";
import { ToggleVisibilityButton } from "../../ui/toggleVisibilityButton/toggleVisibilityButton";

const INITIAL_REVIEWS_COUNT = 3;

export const BookReviews = ({ bookId }: { bookId: string }) => {
  const [reviewsData, setReviewsData] = useState<ReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchBookReviews(bookId);
        setReviewsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [bookId]);

  if (loading) {
    return <div className="text-center p-4">Загрузка отзывов...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  if (!reviewsData?.reviews?.length) {
    return <div className="text-center p-4">Отзывов пока нет</div>;
  }

  const reviewsToShow = showAllReviews
    ? reviewsData.reviews
    : reviewsData.reviews.slice(0, INITIAL_REVIEWS_COUNT);

  return (
    <div className="mt-4 md:mt-6 max-w-[1500px] flex flex-col gap-4">
      {reviewsToShow.map((review) => (
        <ReviewItem
          key={`${review.user_name}-${review.date}`}
          review={review}
        />
      ))}

      {reviewsData.reviews.length > INITIAL_REVIEWS_COUNT && (
        <ToggleVisibilityButton
          showAll={showAllReviews}
          totalItems={reviewsData.reviews.length}
          onClick={() => setShowAllReviews(!showAllReviews)}
          itemType="reviews"
        />
      )}
    </div>
  );
};
