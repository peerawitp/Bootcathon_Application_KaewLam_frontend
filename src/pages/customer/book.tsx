import apiInstance from "@/api/instance";
import CustomerLayout from "@/components/layouts/CustomerLayout";

import { useLine } from "@/hooks/useLine";
import { useLineInfo } from "@/hooks/useLineInfo";

function CustomerBookPage() {
  const { liffObject, status } = useLine();
  const { idToken } = useLineInfo({ liff: liffObject, status });

  // API Example
  apiInstance({
    method: "GET",
    url: "/",
  }).then((res) => {
    console.log(res);
  });

  return (
    <CustomerLayout>
      <div>
        <h1>Customer Book Page</h1>
        <p>{idToken}</p>
      </div>
    </CustomerLayout>
  );
}

export default CustomerBookPage;
