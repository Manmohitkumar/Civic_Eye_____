import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Auth.css"; // make sure path matches your project

// Initialize react-toastify once in app root (e.g., App.jsx):
// import { ToastContainer } from 'react-toastify';
// <ToastContainer position="top-right" autoClose={4000} />

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // OTP state
    const [otpStep, setOtpStep] = useState(false);
    const [otpToken, setOtpToken] = useState(null); // temporary token from server to verify OTP
    const [otpCode, setOtpCode] = useState("");
    const [otpLoading, setOtpLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    const validate = () => {
        const e = {};
        if (!email) e.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email";
        if (!password) e.password = "Password is required";
        else if (password.length < 6) e.password = "Password must be at least 6 characters";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const onSubmit = async (ev) => {
        ev?.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const payload = await res.json().catch(() => ({}));
                toast.error(payload?.message || "Login failed");
                setLoading(false);
                return;
            }

            const data = await res.json();
            // Server may respond with either a final token OR indicate OTP is required
            // Example when OTP required: { otpRequired: true, otpToken: 'abc' }
            if (data.otpRequired) {
                setOtpToken(data.otpToken || null);
                setOtpStep(true);
                setCanResend(false);
                setResendTimer(60);
                // start timer
            } else {
                // final token flow
                if (data.token) {
                    localStorage.setItem("auth_token", data.token);
                }
                toast.success("Signed in successfully");
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 700);
            }
        } catch (err) {
            console.error(err);
            toast.error("Network error. Try again.");
        } finally {
            setLoading(false);
        }
    };

    // OTP countdown effect
    React.useEffect(() => {
        if (!otpStep) return;
        setCanResend(false);
        setResendTimer((t) => (t > 0 ? t : 0));
        let timerId = null;
        if (resendTimer > 0) {
            timerId = setInterval(() => {
                setResendTimer((t) => {
                    if (t <= 1) {
                        clearInterval(timerId);
                        setCanResend(true);
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(timerId);
    }, [otpStep]);

    const verifyOtp = async (ev) => {
        ev?.preventDefault();
        if (!otpCode || otpCode.trim().length === 0) {
            toast.error("Enter the OTP sent to your email/phone");
            return;
        }
        setOtpLoading(true);
        try {
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ otpToken, code: otpCode }),
            });
            if (!res.ok) {
                const payload = await res.json().catch(() => ({}));
                toast.error(payload?.message || "OTP verification failed");
                setOtpLoading(false);
                return;
            }
            const data = await res.json();
            if (data.token) {
                localStorage.setItem("auth_token", data.token);
            }
            toast.success("Verified — signing in");
            setTimeout(() => (window.location.href = "/dashboard"), 700);
        } catch (err) {
            console.error(err);
            toast.error("Network error verifying OTP");
        } finally {
            setOtpLoading(false);
        }
    };

    const resendOtp = async () => {
        if (!canResend) return;
        try {
            const res = await fetch("/api/auth/resend-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otpToken }),
            });
            if (!res.ok) {
                const payload = await res.json().catch(() => ({}));
                toast.error(payload?.message || "Could not resend OTP");
                return;
            }
            toast.success("OTP resent");
            setCanResend(false);
            setResendTimer(60);
        } catch (err) {
            console.error(err);
            toast.error("Network error resending OTP");
        }
    };

    return (
        <div className="auth-page min-h-screen flex items-center justify-center">
            <div className="auth-bg-animated absolute inset-0 -z-10" />
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-6">
                        <div className="mx-auto w-64">
                            <h1 className="text-white text-xl font-semibold text-center">CivicEye</h1>
                        </div>
                    </div>

                    {!otpStep ? (
                        <form
                            onSubmit={onSubmit}
                            className="glass-card backdrop-blur-md bg-white/20 border border-white/20 shadow-lg rounded-xl p-6"
                            noValidate
                        >
                            <h2 className="text-2xl font-semibold text-white mb-4">Sign In</h2>

                            <label className="block text-sm text-white/90 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-4 py-2 rounded-md mb-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition ${errors.email ? "ring-2 ring-red-400" : ""}
                                `}
                                placeholder="you@domain.gov"
                                autoComplete="email"
                            />
                            {errors.email && <div className="text-xs text-red-200 mb-2">{errors.email}</div>}

                            <label className="block text-sm text-white/90 mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full px-4 py-2 rounded-md mb-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition ${errors.password ? "ring-2 ring-red-400" : ""}`}
                                    placeholder="Enter password"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                            {errors.password && <div className="text-xs text-red-200 mb-2">{errors.password}</div>}

                            <div className="flex justify-between items-center text-sm text-white/90 mb-4">
                                <a href="/forgot-password" className="hover:underline">
                                    Forgot Password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition text-white font-medium px-4 py-2 rounded-md"
                            >
                                {loading ? (
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 100 24v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                                        ></path>
                                    </svg>
                                ) : null}
                                <span>{loading ? "Signing in..." : "Sign In"}</span>
                            </button>

                            <div className="mt-4 text-sm text-white/90 text-center">
                                Don't have an account?{" "}
                                <a href="/signup" className="text-amber-400 font-semibold hover:underline">
                                    Create Account
                                </a>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={verifyOtp} className="glass-card backdrop-blur-md bg-white/20 border border-white/20 shadow-lg rounded-xl p-6" noValidate>
                            <h2 className="text-2xl font-semibold text-white mb-4">Enter OTP</h2>
                            <p className="text-sm text-white/90 mb-3">An OTP was sent to your email/phone. Enter it below to complete sign in.</p>

                            <label className="block text-sm text-white/90 mb-1">OTP Code</label>
                            <input
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value)}
                                className={`w-full px-4 py-2 rounded-md mb-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition`}
                                placeholder="123456"
                            />

                            <div className="flex items-center justify-between gap-2">
                                <button type="submit" disabled={otpLoading} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                                    {otpLoading ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle></svg>
                                    ) : null}
                                    Verify
                                </button>

                                <div className="text-sm text-white/90">
                                    {canResend ? (
                                        <button type="button" onClick={resendOtp} className="underline text-amber-300">Resend OTP</button>
                                    ) : (
                                        <span className="text-white/60">Resend in {resendTimer}s</span>
                                    )}
                                </div>
                            </div>
                        </form>
                    )}

                    <div className="mt-6 text-center text-xs text-white/70">
                        <p>By signing in you agree to the portal terms and privacy.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
