import { Link, useNavigate } from "react-router-dom"
import Label from "../from/Label"
import InputField from "../from/input/InputField"
import { useState } from "react"
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icon"
import Button from "../ui/Button/Button"
import type { SignUpFormData } from "../../types/Authen"
import { validateForm } from "../../utils/validateFrom"
import { authServices } from "../../services/authServices"
import { toast } from "react-toastify"

const signupSchema = {
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
    phone: [
        { required: true, message: "Phone is required" },
        {
            pattern: /^(\d{3})(\d{3})(\d{4})$/,
        },
    ],
    name: [{ required: true, message: "Name is required" }],
    userName: [{ required: true, message: "UserName is required" }],
};

const SignUpFrom = () => {
    const [showPassword, setShowPassword] = useState(true)
    const [form, setForm] = useState<SignUpFormData>({
        email: "",
        userName: "",
        password: "",
        name: "",
        phone: "",
    })

    const [errors, setErrors] = useState({
        email: "",
        userName: "",
        password: "",
        name: "",
        phone: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { valid, errors } = validateForm(form, signupSchema)
        setErrors(errors);
        if (!valid) return
        setIsLoading(true);
        try {
            const res = await authServices.signup(form)
            console.log(res.data.success);

            if (res.data.success) {
                toast.success("Đăng ký thành công", {
                    autoClose: 2000,
                    position: "top-right"
                })
                navigate("/signin")
            } else {
                toast.warning(res.data.error, {
                    autoClose: 2000,
                    position: "top-right",
                });
            }
        } catch (error) {
            toast.error("Đăng ký thất bại.")
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="flex h-screen">
            <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">

                <div className="flex flex-col justify-center flex-1 mb-10 w-full max-w-md mx-auto">
                    <div className="flex flex-col gap-2 mb-10 w-full">
                        <h1 className="mb-2 lg:text-black lg:text-4xl font-bold sm:text-3xl">Sign Up</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Enter your email and password to sign up!
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        {/* USERNAME + NAME */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                            <div className="sm:col-span-1">
                                <Label htmlFor="username" className="font-medium mb-3">
                                    User Name <span className="text-red-800">*</span>
                                </Label>
                                <InputField
                                    onChange={handleChange}
                                    type="text"
                                    id="username"
                                    name="userName"
                                    placeholder="Enter your user name"
                                    className=""
                                    value={form.userName}
                                />
                                {errors && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.userName}
                                    </p>
                                )}
                            </div>

                            <div className="sm:col-span-1">
                                <Label htmlFor="name" className=" font-medium mb-3">
                                    Name <span className="text-red-800">*</span>
                                </Label>
                                <InputField
                                    onChange={handleChange}
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your name"
                                    className=""
                                    value={form.name}
                                />
                                {errors && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* EMAIL + PHONE*/}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                                <Label htmlFor="phone">
                                    Phone<span className="text-error-500">*</span>
                                </Label>
                                <InputField
                                    type="number"
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter your phone"
                                    onChange={handleChange}
                                    value={form.phone}
                                />
                                {errors && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            <div className="sm:col-span-1">
                                <Label>
                                    Email<span className="text-error-500">*</span>
                                </Label>
                                <InputField
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                    value={form.email}
                                />
                                {errors && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <Label htmlFor="password" className="font-medium mb-3">
                                Password <span className="text-red-800">*</span>
                            </Label>
                            <div className="relative w-full">
                                <InputField
                                    onChange={handleChange}
                                    value={form.password}
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="w-full"
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"

                                >
                                    {showPassword ? (
                                        <EyeIcon className="fill-gray-500 size-5" />
                                    ) : (
                                        <EyeCloseIcon className="fill-gray-500 size-5" />
                                    )}
                                </span>
                            </div>
                            {errors && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* BUTTON */}
                        <div className="bg-[#4056e6] rounded-xl hover:bg-blue-800 focus:bg-blue-800">
                            <Button
                                // type="submit"
                                className={`cursor-pointer w-full px-4 py-2 text-white hover:bg-blue-900 rounded-lg transition 
                                    ${isLoading
                                        ? "bg-blue-700 cursor-not-allowed"
                                        : "bg-blue-700"
                                    }
                                    `}
                            >
                                <div className="flex items-center">
                                    {isLoading ? (
                                        <>
                                            <svg
                                                className="w-4 h-4 mr-2 animate-spin text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                                                />
                                            </svg>
                                            Loading...
                                        </>
                                    ) : (
                                        "Sign Up"
                                    )}
                                </div>
                            </Button>
                        </div>
                    </form>

                    {/* SIGN IN LINK */}
                    <div className="mt-5">
                        <p className="text-sm font-normal text-center text-gray-700">
                            Already have an account?{" "}
                            <Link
                                to="/signin"
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
            <div className="items-center hidden w-full h-full lg:w-1/2 bg-blue-950 lg:grid"></div>
        </div>
    )
}

export default SignUpFrom