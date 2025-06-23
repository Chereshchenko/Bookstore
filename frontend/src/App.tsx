import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Home } from "./pages/home/home";
import { Auth } from "./pages/auth/Auth";
import { Registration } from "./pages/registration/Registration";
import { BooksCatalog } from "./pages/booksCatalog/BooksCatalog";
import { BookDetails } from "./pages/bookDetails/BookDetails";
import { Cart } from "./pages/cart/Cart";
import { OrderHistory } from "./pages/orderHistory/OrderHistory";
import { ToastContainer } from "react-toastify";
import { Order } from "./pages/order/order";
import { OrderReceipt } from "./pages/orderReceipt/orderReceipt";
import "./index.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Auth />,
    },
    {
      path: "/register",
      element: <Registration />,
    },
    {
      path: "/books",
      element: <BooksCatalog />,
    },
    {
      path: "/books/:id",
      element: <BookDetails />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/order",
      element: <Order />,
    },
    {
      path: "/history",
      element: <OrderHistory />,
    },
    {
      path: "/order/:id",
      element: <OrderReceipt />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer 
        position="bottom-center" 
        autoClose={2000}  
        closeButton={false} 
        theme="dark" 
        limit={1}
      />
    </>
  );
}

export default App;