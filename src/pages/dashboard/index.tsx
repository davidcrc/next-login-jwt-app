import { useState } from "react";
import profileService from "@/services/profile";
import loginService from "@/services/login";
import { useRouter } from "next/router";

const DashboardPage = () => {
  const [user, setUser] = useState(undefined);
  const router = useRouter();

  const getProfile = async () => {
    const profile = await profileService.getProfile();

    setUser(profile);
    // console.log("[profile]", profile);
  };

  const logOut = async () => {
    //
    const response = await loginService.logOut();

    console.log("logout", response);

    router.replace("/");
  };

  return (
    <div className="flex flex-col gap-4">
      <h1>DashboardPage</h1>

      {JSON.stringify(user)}

      <button className="bg-green-500 w-fit " onClick={getProfile}>
        get profile
      </button>

      <button className="bg-red-400 text-black w-fit" onClick={logOut}>
        LogOut
      </button>
    </div>
  );
};

export default DashboardPage;
