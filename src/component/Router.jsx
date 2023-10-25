import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useRoutes,
} from "react-router-dom";
import Index from "../pages/Index";
import ProductList from "../pages/product/ProductList";
import { ProductDetail } from "../pages/product/ProductDetail";
import { LoginForm } from "../pages/member/LoginForm";
import { OrderForm } from "../pages/order/OrderForm";
import { checkToken } from "../apis/api/member";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import { AddressInfoForm } from "./addressInfo/AddressInfoForm";
import { OrderList } from "../pages/order/OrderList";
import { ChatForm } from "../pages/chat/ChatForm";
import { memberFromTokenService } from "../apis/services/member";
import { ChatList } from "../pages/chat/ChatList";
import { NotificationList } from "../pages/notification/NotificationList";

export const Router = () => {
  const { isLogin, setIsLogin, profile, setProfile } = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      await checkToken()
        .then(memberFromTokenService)
        .then((res) => {
          if (res) {
            setIsLogin(true);
            setProfile(res);
          }
        });
    })();
  }, [isLogin]);
  return (
    <Routes>
      <Route path="/" exact element={<Index />} />
      <Route
        path="/login"
        element={isLogin ? <Navigate to="/" /> : <LoginForm />}
      />
      <Route path="/product/list" element={<ProductList />} />
      <Route path="/product/detail/:productId" element={<ProductDetail />} />
      <Route
        path="/order/add/:productId"
        element={isLogin ? <OrderForm /> : <LoginForm />}
      />
      <Route
        path="/order/list"
        element={isLogin ? <OrderList /> : <LoginForm />}
      />
      <Route
        path="/deliveryInfo/add"
        element={isLogin ? <AddressInfoForm /> : <LoginForm />}
      />
      <Route
        path="/chat/:roomId"
        element={isLogin ? <ChatForm /> : <LoginForm />}
      />
      <Route
        path="/chat/list"
        element={isLogin ? <ChatList /> : <LoginForm />}
      />
      <Route
        path="/alert/list"
        element={isLogin ? <NotificationList /> : <LoginForm />}
      />
    </Routes>
  );
};
