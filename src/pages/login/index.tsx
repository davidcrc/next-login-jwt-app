import React, { useState } from "react";
import authService from "@/services/login";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    email: "admin@local.local",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log("handle submit", credentials);

    const userResponse = await authService.authenticate(
      credentials.email,
      credentials.password
    );

    // console.log("[userResponse]", userResponse);

    router.replace("/dashboard");
  };

  return (
    <div>
      <form className="flex flex-col gap-3 p-8 " onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="email"
          className="text-black"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          className="text-black"
          onChange={handleChange}
        />

        <button>LoginPage</button>
      </form>
    </div>
  );
};

export default LoginPage;
