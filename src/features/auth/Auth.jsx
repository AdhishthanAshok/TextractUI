import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { login, createAccount } from "../../api/authService";

export default function Auth() {
    const [mode, setMode] = useState("login"); // "login" or "signup"
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        try {
            const apiCall = mode === "login" ? login : createAccount;
            await apiCall(formData);

            Swal.fire({
                position: "top-end",
                icon: "success",
                title:
                    mode === "login"
                        ? "Login successful!"
                        : "Account created successfully!",
                showConfirmButton: false,
                timer: 2000,
                toast: true,
            });

            reset();
            setTimeout(() => navigate("/dashboard"), 2000);
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: error.message,
                showConfirmButton: false,
                timer: 2500,
                toast: true,
            });
        }
    };

    const toggleMode = () => {
        setMode((prev) => (prev === "login" ? "signup" : "login"));
        reset();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 transition-all duration-500">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-500"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-700 transition-colors duration-300">
                    {mode === "login" ? "Login" : "Create Account"}
                </h2>

                {/* Email or Username */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Email or Username"
                        {...register("emailOrUsername", {
                            required: "This field is required",
                        })}
                        className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${errors.emailOrUsername
                                ? "border-red-500 focus:ring-red-200"
                                : "border-gray-300 focus:ring-blue-200"
                            }`}
                    />
                    {errors.emailOrUsername && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.emailOrUsername.message}
                        </p>
                    )}
                </div>

                {/* Phone (signup only) */}
                {mode === "signup" && (
                    <div className="mb-4 transition-all duration-300 ease-in-out">
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            {...register("phone", {
                                required: "Phone is required",
                                pattern: {
                                    value: /^[0-9]{10,14}$/,
                                    message: "Enter a valid phone number",
                                },
                            })}
                            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${errors.phone
                                    ? "border-red-500 focus:ring-red-200"
                                    : "border-gray-300 focus:ring-blue-200"
                                }`}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>
                )}

                {/* Password */}
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${errors.password
                                ? "border-red-500 focus:ring-red-200"
                                : "border-gray-300 focus:ring-blue-200"
                            }`}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full text-white py-3 rounded font-semibold transition duration-300 ${mode === "login"
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                >
                    {mode === "login" ? "Login" : "Sign Up"}
                </button>

                {/* Toggle Mode */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    {mode === "login" ? (
                        <>
                            Don’t have an account?{" "}
                            <button
                                type="button"
                                onClick={toggleMode}
                                className="text-blue-500 hover:underline"
                            >
                                Create one
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={toggleMode}
                                className="text-blue-500 hover:underline"
                            >
                                Log in
                            </button>
                        </>
                    )}
                </p>
            </form>
        </div>
    );
}