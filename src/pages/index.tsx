import { Button } from "@/components/ui/button";
import { useLine } from "../hooks/useLine";
import { useLineInfo } from "../hooks/useLineInfo";

function IndexPage() {
  const { liffObject, status, login } = useLine();

  const { idToken, profile, version } = useLineInfo({
    liff: liffObject,
    status,
  });

  console.log({ profile, version });

  console.log({ liffObject, status });

  if (status !== "inited") {
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
          <div>
            <img src={profile.pictureUrl} />
            <p>{profile.userId}</p>
            <p>{JSON.stringify(liffObject)}</p>
            <p>{idToken}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default IndexPage;
