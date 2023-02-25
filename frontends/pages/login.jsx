import React, { useState } from "react";
import Link from "next/link";
import { useMutation } from "react-query";
import Router from "next/router";
import { loginUser } from "../utils/api";

export default function LoginPage() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const { isLoading, mutate } = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log(data);
      Router.push("/");
    },
    onError: ({ response }) => {
      alert(response?.data?.message);
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(loginDetails);
  };

  return (
    <div className="flex items-center min-h-screen">
      <div className="w-full md:w-1/2 flex py-10 flex-col items-center justify-center px-[7%]">
        <h1 className="text-4xl font-bold">Welcome back!</h1>

        <p className="text-gray-400 mb-12">Enter your details to continue</p>

        <form onSubmit={handleSubmit} className="w-full space-y-6 max-w-sm">
          <div className="space-y-1 flex flex-col">
            <label className="text-gray-500" htmlFor="email">
              Email address
            </label>
            <input
              value={loginDetails.email}
              onChange={handleChange}
              className="w-full h-12 placeholder:text-gray-300 px-4 py-2 rounded-md outline-none border border-gray-300 border-solid"
              type="email"
              name="email"
              required
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-1 flex flex-col">
            <label className="text-gray-500" htmlFor="password">
              Password
            </label>
            <input
              value={loginDetails.password}
              onChange={handleChange}
              className="w-full h-12 placeholder:text-gray-300 px-4 py-2 rounded-md outline-none border border-gray-300 border-solid"
              type="password"
              name="password"
              required
              id="password"
              placeholder="Enter your password"
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-teal-600 rounded-md shadow-sm text-lg font-bold text-white h-12"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-gray-400">
            Don't have an account?{" "}
            <span className="text-teal-500 font-semibold">
              <Link href="/register">Sign up</Link>
            </span>
          </p>
        </form>
      </div>
      <div
        className="w-1/2 hidden md:flex min-h-screen flex-shrink-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(/images/login-bg.jpg)`,
        }}
      ></div>
    </div>
  );
}
