import { Button } from "@/components/ui/button";
import { useLine } from "@/hooks/useLine";
import { useLineInfo } from "@/hooks/useLineInfo";

function IndexPage() {
  const { liffObject, status, login } = useLine();

  const { profile, version } = useLineInfo({
    liff: liffObject,
    status,
  });

  console.log({ profile, version });

  console.log({ liffObject, status });

  if (status == "signin") {
    return (
      <>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="mt-6 mb-6 text-center text-3xl font-extrabold text-gray-900">
                {"Sign in to your LINE account"}
              </h2>

              <Button onClick={login}>Login</Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* <div>
            <img src={profile.pictureUrl} />
            <p>{profile.userId}</p>
            <p>{JSON.stringify(liffObject)}</p>
            <p>{idToken}</p>
          </div> */}
          <h1 className="text-center text-lg text-red-800">
            Please use in LINE Platform!
          </h1>
        </div>
      </div>
    </>
  );
}

export default IndexPage;
