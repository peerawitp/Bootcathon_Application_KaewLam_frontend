import { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Lottie from "react-lottie";

import IndexPage from "@/pages/index";
import CustomerBookPage from "@/pages/customer/book";
import ComfirmOrderPage from "@/pages/customer/confirm";
import ReviewPage from "@/pages/customer/review";
import RewardPage from "@/pages/customer/rewards";
import CouponPage from "@/pages/customer/coupon";
import OrderPage from "@/pages/customer/order";
import Profile from "@/pages/customer/profile";
import RegisterPage from "@/pages/customer/register";
import AddCarPage from "@/pages/customer/add-car";

import { useLine } from "@/hooks/useLine";
import LoadingCarAnimation from "@/assets/lotties/loading_car.json";
import { apiInstance } from "@/api/instance";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: LoadingCarAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { liffObject, status } = useLine();

  console.log(status);

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

const MemberRoute = ({ children }: { children: React.ReactNode }) => {
  const { status } = useLine();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (status === "inited") {
      apiInstance({
        method: "GET",
        url: "/customer/status",
      })
        .then((res) => {
          if (res.data) {
            if (res.data.isRegistered) {
              if (res.data.isCarRegistered) {
                setIsAllowed(true);
              } else {
                navigate("/customer/add-car");
              }
            } else {
              navigate("/customer/register");
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching customer profile:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [status, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Lottie options={defaultOptions} height={300} width={300} />
      </div>
    );
  }

  return isAllowed ? children : null;
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
                <MemberRoute>
                  <CustomerBookPage />
                </MemberRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/confirm"
            element={
              <ProtectedRoute>
                <MemberRoute>
                  <ComfirmOrderPage />
                </MemberRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/review"
            element={
              <ProtectedRoute>
                <MemberRoute>
                  <ReviewPage />
                </MemberRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/order"
            element={
              <ProtectedRoute>
                <MemberRoute>
                  <OrderPage />
                </MemberRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/rewards"
            element={
              <ProtectedRoute>
                <MemberRoute>
                  <RewardPage />
                </MemberRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/coupon"
            element={
              <ProtectedRoute>
                <MemberRoute>
                  <CouponPage />
                </MemberRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/profile"
            element={
              <ProtectedRoute>
                <MemberRoute>
                  <Profile />
                </MemberRoute>
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
