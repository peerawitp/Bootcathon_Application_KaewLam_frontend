import "../App.css";

import { useLine } from "../hooks/useLine";
import { useLineInfo } from "../hooks/useLineInfo";

function IndexPage() {
  const { liffObject, status, login, logout } = useLine();

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
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {"Sign in to your account"}
              </h2>

              <button onClick={login} type="button">
                Login
              </button>
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
