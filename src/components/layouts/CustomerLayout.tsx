import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const CustomerLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <div></div>
      {children}
    </>
  );
};

export default CustomerLayout;
