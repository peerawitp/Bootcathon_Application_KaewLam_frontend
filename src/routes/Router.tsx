import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Lottie from "react-lottie";

import IndexPage from "@/pages/index";
import CustomerBookPage from "@/pages/customer/book";

import { useLine } from "@/hooks/useLine";
import LoadingCarAnimation from "@/assets/lotties/loading_car.json";
import ComfirmOrderPage from "@/pages/customer/confirm";
import ReviewPage from "@/pages/customer/review";
import RewardPage from "@/pages/customer/rewards";
import CouponPage from "@/pages/customer/coupon";
import OrderPage from "@/pages/customer/order";
import Profile from "@/pages/customer/profile";
import RegisterPage from "@/pages/customer/register";
import AddCarPage from "@/pages/customer/add-car";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { liffObject, status } = useLine();

  console.log(status);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingCarAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (liffObject) {
    if (status === "inited") return children;
    else return <Navigate to="/" />;
  } else {
    // Loading
    return (
      <div className="flex justify-center items-center h-screen">
        <Lottie options={defaultOptions} height={300} width={300} />
      </div>
    );
  }
};

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route
            path="/customer/book"
            element={
              <ProtectedRoute>
                <CustomerBookPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/confirm"
            element={
              <ProtectedRoute>
                <ComfirmOrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/review"
            element={
              <ProtectedRoute>
                <ReviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/order"
            element={
              <ProtectedRoute>
                <OrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/rewards"
            element={
              <ProtectedRoute>
                <RewardPage/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/coupon"
            element={
              <ProtectedRoute>
                <CouponPage/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/profile"
            element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/register"
            element={
              <ProtectedRoute>
                <RegisterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/add-car"
            element={
              <ProtectedRoute>
                <AddCarPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
