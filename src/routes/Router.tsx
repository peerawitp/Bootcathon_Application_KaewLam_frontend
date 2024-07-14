import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Lottie from "react-lottie";

import IndexPage from "@/pages/index";
import CustomerBookPage from "@/pages/customer/book";

import { useLine } from "@/hooks/useLine";
import LoadingCarAnimation from "@/assets/lotties/loading_car.json";
import ComfirmOrderPage from "@/pages/customer/confirm";

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
      <Suspense>
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
            path="/customer/comfirm"
            element={
              <ProtectedRoute>
                <ComfirmOrderPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
