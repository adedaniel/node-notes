import React, { useState } from "react";
import { registerUser } from "../utils/api";
import Router from "next/router";
import { useMutation } from "react-query";
import Link from "next/link";

export default function RegisterPage() {
  const [registerDetails, setRegisterDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { isLoading, mutate } = useMutation(registerUser, {
    onSuccess: (data) => {
      Router.push("/");
    },
    onError: ({ response }) => {
      alert(response?.data?.message);
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegisterDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(registerDetails);
  };

  return (
    <div className="flex items-center min-h-screen">
      <div className="w-full md:w-1/2 flex py-10 flex-col items-center justify-center px-[7%]">
        <h1 className="text-center text-4xl font-bold">
          Explore the full power <br /> of notes!
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Create an account to get started.
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4 max-w-sm">
          <div className="space-y-1 flex flex-col">
            <label className="text-gray-500" htmlFor="firstName">
              First name
            </label>
            <input
              value={registerDetails.firstName}
              onChange={handleChange}
              className="w-full h-12 placeholder:text-gray-300 px-4 py-2 rounded-md outline-none border border-gray-300 border-solid"
              name="firstName"
              required
              id="firstName"
              placeholder="Enter your First name"
            />
          </div>

          <div className="space-y-1 flex flex-col">
            <label className="text-gray-500" htmlFor="lastName">
              Surname
            </label>
            <input
              value={registerDetails.lastName}
              onChange={handleChange}
              className="w-full h-12 placeholder:text-gray-300 px-4 py-2 rounded-md outline-none border border-gray-300 border-solid"
              name="lastName"
              required
              id="lastName"
              placeholder="Enter your First name"
            />
          </div>

          <div className="space-y-1 flex flex-col">
            <label className="text-gray-500" htmlFor="email">
              Email address
            </label>
            <input
              value={registerDetails.email}
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
              value={registerDetails.password}
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
            {isLoading ? "Creating..." : "Create account"}
          </button>

          <p className="text-center text-gray-400">
            Already have an account?{" "}
            <span className="text-teal-500 font-semibold">
              <Link href="/login">Login</Link>
            </span>
          </p>
        </form>
      </div>
      <div
        className="w-1/2 hidden md:flex min-h-screen flex-shrink-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(/images/register-bg.jpg)`,
        }}
      ></div>
    </div>
  );
}
