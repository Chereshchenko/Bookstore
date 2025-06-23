import {
  Book,
  BookTop,
  OrderData,
  OrderResponse,
  OrdersData,
  ReviewsResponse,
  BooksApiResponse,
} from "../types/types";

export const fetchBookById = async (id: string): Promise<Book> => {
  const response = await fetch(`/api/books/${id}`);

  if (!response.ok) {
    throw new Error(
      response.status === 404 ? "Книга не найдена" : "Ошибка при загрузке книги"
    );
  }

  return response.json();
};

export const getCart = async () => {
  const response = await fetch("/api/cart", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Ошибка при загрузке данных корзины");
  }

  return await response.json();
};

export const addToCart = async (bookId: string) => {
  const response = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      book_id: bookId,
      quantity: 1,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Ошибка при добавлении товара в корзину"
    );
  }

  return await response.json();
};

export const updateItemQuantity = async (itemId: string, quantity: number) => {
  const response = await fetch(`/api/cart/${itemId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) throw new Error("Ошибка обновления");
  return await response.json();
};

export const removeItem = async (itemId: string) => {
  const response = await fetch(`/api/cart/${itemId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Ошибка удаления");
  return await response.json();
};

export const fetchBookReviews = async (
  bookId: string
): Promise<ReviewsResponse> => {
  const response = await fetch(`/api/books/${bookId}/reviews`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Не удалось загрузить отзывы");
  }
  return response.json();
};

export const submitReview = async (
  bookId: string,
  rating: number,
  comment: string
) => {
  const response = await fetch(`/api/books/${bookId}/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      feedback_text: comment,
      rating: rating,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Ошибка при отправке отзыва.");
  }

  return response.json();
};

export const fetchTopBooks = async (limit: number = 3): Promise<BookTop[]> => {
  const response = await fetch(`/api/books/top?limit=${limit}`);

  if (!response.ok) {
    throw new Error("Ошибка при загрузке топовых книг");
  }

  const data = await response.json();
  return data.top_books;
};

export const getGenres = async () => {
  const response = await fetch("/api/genres", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Ошибка при загрузке жанров");
  }

  return await response.json();
};

export async function createOrder(
  orderData: OrderData
): Promise<OrderResponse> {
  const response = await fetch("api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error("Ошибка при оформлении заказа");
  }

  return response.json();
}

export const fetchOrders = async (): Promise<OrdersData> => {
  const response = await fetch("/api/orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Ошибка при загрузке заказов");
  }

  return response.json();
};

export const fetchBooks = async (params?: {
  genre?: string;
  search?: string;
  min_price?: number;
  max_price?: number;
  sort_by?: string;
}): Promise<BooksApiResponse> => {
  const queryParams = new URLSearchParams();

  if (params?.genre) queryParams.append("genre", params.genre);
  if (params?.search) queryParams.append("search", params.search);
  if (params?.min_price)
    queryParams.append("min_price", params.min_price.toString());
  if (params?.max_price)
    queryParams.append("max_price", params.max_price.toString());
  if (params?.sort_by) queryParams.append("sort_by", params.sort_by);

  const url = `/api/books?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Ошибка при загрузке книг");
  }

  return response.json();
};
export const fetchAllBooks = async (): Promise<BookTop[]> => {
  const response = await fetch("/api/books");

  if (!response.ok) {
    throw new Error("Ошибка при загрузке книг");
  }

  const data = await response.json();
  return data.books;
};
