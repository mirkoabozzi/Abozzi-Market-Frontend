import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNav from "./components/Navbar/MyNav";
import TopBar from "./components/TopBar/TopBar";
import Category from "./components/Category/Category";
import Home from "./components/Home/Home";
import Shop from "./components/Shop/Shop";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer";
import OrderDetails from "./components/Profile/OrderDetails";
import NotFound from "./components/NotFound/NotFound";
import ProductDetails from "./components/Shop/ProductDetails";
import MyOrder from "./components/Profile/MyOrder";
import UpdateProfile from "./components/Profile/UpdateProfile";
import MyAddress from "./components/Profile/MyAddress";
import WishList from "./components/Profile/WishList";
import CategoryManagement from "./components/Profile/CategoryManagement";
import AddProduct from "./components/Profile/AddProduct";
import Cart from "./components/Cart/Cart";
import Success from "./components/Cart/Success";
import Cancel from "./components/Cart/Cancel";
import Failed from "./components/Cart/Failed";
import Orders from "./components/Profile/Orders";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <MyNav />
      <Category />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/profile" element={<Profile />}>
          <Route index element={<MyOrder />} />
          <Route path="orders" element={<MyOrder />} />
          <Route path="orders/details/:id" element={<OrderDetails />} />
          <Route path="update" element={<UpdateProfile />} />
          <Route path="address" element={<MyAddress />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="category" element={<CategoryManagement />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="clientsOrders" element={<Orders />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/success/*" element={<Success />} />
        <Route path="/cancel/*" element={<Cancel />} />
        <Route path="/failed/*" element={<Failed />} />
        <Route path="/product/details/:id" element={<ProductDetails />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
