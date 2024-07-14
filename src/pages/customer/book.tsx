import apiInstance from "@/api/instance";
import CustomerLayout from "@/components/layouts/CustomerLayout";

import { useLine } from "@/hooks/useLine";
import { useLineInfo } from "@/hooks/useLineInfo";
import { useState, useEffect } from "react";

function CustomerBookPage() {
  const [message, setMessage] = useState("Fetching...");
  const { liffObject, status } = useLine();
  const { idToken } = useLineInfo({ liff: liffObject, status });

  // API Example
  useEffect(() => {
    apiInstance({
      method: "GET",
      url: "/",
    }).then((res) => {
      setMessage(res.data);
    });
  }, []);

  return (
    <CustomerLayout>
      <div>
        <h1>Customer Book Page</h1>
        <p>{idToken}</p>

        <div>Message from API: {message}</div>
      </div>
    </CustomerLayout>
  );
}

export default CustomerBookPage;
