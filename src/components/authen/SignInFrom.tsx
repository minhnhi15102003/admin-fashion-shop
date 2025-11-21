import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button/Button";
import InputField from "../from/input/InputField";
import Label from "../from/Label";
import { EyeCloseIcon, EyeIcon } from "../../icon";
import { validateForm } from "../../utils/validateFrom";
import { authServices } from "../../services/authServices";
import { loginSuccess } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "../../utils/token";
import { toast } from "react-toastify";

const loginSchema = {
  email: [
    { required: true, message: "Email is required" },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" },
  ],
  password: [
    { required: true, message: "Password is required" },
    { minLength: 6, message: "Password must be at least 6 characters" },
    {
      pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/,
      message: "Ít nhất 1 chữ hoa, 1 ký tự đặc biệt,",
    },
  ],
  role:[]
}

export default function SignInForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formDataSignIn, setFormDataSignin] = useState({
    email: "",
    password: "",
    role: "ADMIN"
  })
  const [errors, setError] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataSignin({
      ...formDataSignIn,
      [name]: value
    })
  }
  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { valid, errors } = validateForm(formDataSignIn, loginSchema)
    setError(errors)
    if (!valid) return;
    setIsLoading(true);
    try {
      const res = await authServices.signin(formDataSignIn)
      const { success, accessToken, user } = res.data
      if (success) {
        dispatch(loginSuccess({ accessToken, user }))
        setAccessToken(accessToken)
        setUser(user)
        toast.success("Đăng nhập thành công")
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex">
      <div className="flex flex-col justify-center flex-1 max-w-md pt-10 mx-auto lg:w-1/2 no-scrollbar">

        {/* Title */}
        <div className="flex flex-col gap-2 mb-8 w-full">
          <h1 className="mb-2 lg:text-black lg:text-4xl font-bold sm:text-3xl">
            Sign In
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your email and password to sign in!
          </p>
        </div>


        {/* Form */}
        <form onSubmit={handleSignin} className="space-y-3">
          {/* Email */}
          <div>
            <Label className="block text-sm font-medium text-black mb-3">
              Email <span className="text-red-800">*</span>
            </Label>
            <InputField
              name="email"
              type="email"
              placeholder="info@gmail.com"
              className=""
              onChange={handleChange}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label className="block text-sm font-medium text-black mb-3">
              Password <span className="text-red-800">*</span>
            </Label>
            <div className="relative">
              <InputField
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className=""
                onChange={handleChange}

              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <EyeCloseIcon className="w-5 h-5 fill-gray-400" />
                ) : (
                  <EyeIcon className="w-5 h-5 fill-gray-400" />
                )}
              </span>
            </div>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password}
            </p>
          )}
          {/* Remember me + Forgot */}
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-sm text-gray-700">
              <InputField
                type="checkbox"
                // checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="h-0 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              Keep me logged in
            </Label>
            <Link
              to="/reset-password"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <div className="bg-[#4056e6] rounded-xl hover:bg-blue-800 focus:bg-blue-800">
            <Button
              disabled={isLoading}
              // type="submit"
              className="cursor-pointer w-full px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-900 transition"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-3 text-sm font-normal text-center text-gray-700">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
      <div className="items-center h-screen w-full lg:w-1/2 bg-blue-950 lg:grid sm:hidden"></div>
    </div>
  );
}
