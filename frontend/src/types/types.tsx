import { ReactNode } from "react";

export type Book = {
  isbn: string;
  title: string;
  author: {
    id: string;
    name: string;
  };
  cover_image: string;
  description: string;
  genre: string;
  price: number;
  year: number;
  rating: {
    average: number;
    count: number;
  }
};

export type BookTop = {
  isbn: string;
  title: string;
  author: string;
  description: string;
  cover_image?: string;
  average_rating?: number | null;
  reviews_count?: number;
  price: number;
  year?: number;
  isRandom?: boolean;
};

export type BookSliderProps = {
  books: BookTop[];
  children?: React.ReactNode;
};

export type BookInfoProps = {
  bookId: string;
  title: string;
  author: string;
  year: number;
  price: number;
  description: string;
  rating: {
    average: number;
    count: number;
  }
};

export type BookResponse = {
  isbn: string;
  title: string;
  author: string;
  price: number;
  cover_image?: string;
  reviews_count?: number;
  year?: number;
  genre: string;
  description?: string;
  rating?: {
    average: number;
    count: number;
  };
};

export type BooksApiResponse = {
  count: number;
  books: BookResponse[];
  filters: {
    genre?: string;
    search?: string;
    min_price?: number;
    max_price?: number;
  };
};

export type BookListProps = {
  books: BookResponse[];
  children?: React.ReactNode;
}

export type Review = {
  user_name: string;
  date: string;
  rating: number;
  text: string;
}

export type ReviewsResponse = {
  reviews: Review[];
}

export type ModalProps = {
  open: boolean;
  message: string;
  onClose: () => void;
};

export type InputWithIconProps = {
  icon: React.ReactNode;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
};

export type ConfirmDialogProps =  {
  open: boolean;
  title: string;
  content: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export type CartItem = {
  book_id: string;
  title: string;
  price: number;
  quantity: number;
  cover_image: string;
  item_total: number;
  author: {
    id: string;
    name: string;
  }
};

export type CartStore = {
  items: CartItem[];
  count: number;
  total: number;
  total_books: number;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  updateItemQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
};

export type OrderData = {
  delivery_type: "самовывоз" | "до двери";
  address: string;
  delivery_comment: string; 
}

export type OrderResponse = {
  order_number: number;
  total: number;
}

export type OrderItemType = {
  author: string;
  cover_image: string;
  isbn: string;
  item_total: number;
  price: number;
  quantity: number;
  title: string;
};

export type Order = {
  address: string | null;
  date: string;
  delivery_comment: string;
  delivery_fee: number;
  delivery_type: string;
  items: OrderItemType[];
  items_count: number;
  order_number: string;
  status: string;
  subtotal: number;
  total: number;
};

export type OrdersData = {
  count: number;
  orders: Order[];
};