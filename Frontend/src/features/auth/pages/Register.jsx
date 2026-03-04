import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const { loading, handleRegister } = useAuth();

  const onSubmit = async ({username ,email, password }) => {
    await handleRegister({ username,email, password });
    navigate("/login");
    reset();
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-[#161616]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-gray-500 max-w-85 w-full mx-4 md:p-6 p-4 py-8 text-left text-sm"
      >
        <h2 className="text-2xl font-bold mb-9 text-center text-gray-100">
          Welcome
        </h2>

        {/* Username */}
        <div className="flex flex-col">
          <div className="flex items-center my-2 border bg-indigo-100/5 border-gray-500/10 rounded gap-1 pl-2">
            <input
              className="w-full outline-none bg-transparent py-2.5"
              type="text"
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
            />
          </div>
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <div className="flex items-center my-2 border bg-indigo-100/5 border-gray-500/10 rounded gap-1 pl-2">
            <input
              className="w-full outline-none bg-transparent py-2.5"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <div className="flex items-center mt-2 border bg-indigo-100/5 border-gray-500/10 rounded gap-1 pl-2">
            <input
              className="w-full outline-none bg-transparent py-2.5"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
              })}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="w-full mt-4 mb-3 bg-indigo-500 hover:bg-indigo-600/90 transition py-2.5 rounded text-white font-medium disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 underline">
            Signin
          </a>
        </p>
      </form>
    </main>
  );
}
