import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}


const CustomerLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="noto-sans-thai">
      {children}
      </div>
    </>
  );
};

export default CustomerLayout;
