import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  
  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth();

  const onSubmit = async ({ email, password }) => {
    await handleLogin({ email, password });
    navigate("/");
    reset();
  };

  if(loading) return <h1>Loading..</h1>

  return (
    <main className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm"
      >
        <h2 className="text-2xl font-bold mb-9 text-center text-gray-100">
          Welcome Back
        </h2>

        {/* Email */}
        <div className="flex flex-col">
          <div className="flex items-center my-2 border bg-indigo-100/5 border-gray-500/10 rounded gap-1 pl-2">
            <input
              className="w-full outline-none bg-transparent py-2.5"
              type="email"
              autoComplete="on"
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
          <div className="flex items-center mt-2 border bg-indigo-100/5 border-gray-200/10 rounded gap-1 pl-2">
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

        {/* Remember me */}
        <div className="flex items-center justify-between mb-6 mt-4">
          <div className="flex items-center gap-1">
            <input id="checkbox" type="checkbox" {...register("rememberMe")} />
            <label htmlFor="checkbox">Remember me</label>
          </div>
          <a className="text-blue-600 underline" href="#">
            Forgot Password
          </a>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600/90 transition py-2.5 rounded text-white font-medium disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 underline">
            Signup
          </a>
        </p>
      </form>
    </main>
  );
}
