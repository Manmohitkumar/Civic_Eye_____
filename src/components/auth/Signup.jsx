import React, { useState } from "react";
import { toast } from "react-toastify";
import "../../styles/Auth.css";

export default function Signup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const passwordRules = (pw) => {
        const min = pw.length >= 8;
        const hasNumber = /[0-9]/.test(pw);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pw);
        return { min, hasNumber, hasSpecial, ok: min && hasNumber && hasSpecial };
    };

    const validate = () => {
        const e = {};
        if (!fullName || fullName.trim().length < 2) e.fullName = "Enter your name";
        if (!email) e.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email";
        const pr = passwordRules(password);
        if (!password) e.password = "Password is required";
        else if (!pr.ok) e.password = "Password must be ≥8 chars, include a number and special char";
        if (password !== confirm) e.confirm = "Passwords do not match";
        if (!agreed) e.agreed = "You must agree to the terms";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const onSubmit = async (ev) => {
        ev?.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, email, password }),
            });

            if (!res.ok) {
                const payload = await res.json().catch(() => ({}));
                toast.error(payload?.message || "Registration failed");
                setLoading(false);
                return;
            }

            const data = await res.json();
            if (data.token) {
                localStorage.setItem("auth_token", data.token);
            }
            toast.success("Account created");
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 700);
        } catch (err) {
            console.error(err);
            toast.error("Network error. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const pr = passwordRules(password);

    return (
        <div className="auth-page min-h-screen flex items-center justify-center">
            <div className="auth-bg-animated absolute inset-0 -z-10" />
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-6">
                        <h1 className="text-white text-xl font-semibold">CivicEye</h1>
                    </div>

                    <form
                        onSubmit={onSubmit}
                        className="glass-card backdrop-blur-md bg-white/20 border border-white/20 shadow-lg rounded-xl p-6"
                        noValidate
                    >
                        <h2 className="text-2xl font-semibold text-white mb-4">Create account</h2>

                        <label className="block text-sm text-white/90 mb-1">Full name</label>
                        <input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className={`w-full px-4 py-2 rounded-md mb-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition ${errors.fullName ? "ring-2 ring-red-400" : ""
                                }`}
                            placeholder="Your full name"
                            autoComplete="name"
                        />
                        {errors.fullName && <div className="text-xs text-red-200 mb-2">{errors.fullName}</div>}

                        <label className="block text-sm text-white/90 mb-1">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className={`w-full px-4 py-2 rounded-md mb-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition ${errors.email ? "ring-2 ring-red-400" : ""
                                }`}
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
                                className={`w-full px-4 py-2 rounded-md mb-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition ${errors.password ? "ring-2 ring-red-400" : ""
                                    }`}
                                placeholder="Create a password"
                                autoComplete="new-password"
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

                        <div className="text-xs text-white/90 mb-2">
                            <div>Password must include:</div>
                            <ul className="list-disc list-inside">
                                <li className={pr.min ? "text-emerald-200" : "text-amber-200"}>Minimum 8 characters</li>
                                <li className={pr.hasNumber ? "text-emerald-200" : "text-amber-200"}>At least one number</li>
                                <li className={pr.hasSpecial ? "text-emerald-200" : "text-amber-200"}>At least one special character</li>
                            </ul>
                        </div>

                        <label className="block text-sm text-white/90 mb-1">Confirm password</label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                className={`w-full px-4 py-2 rounded-md mb-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition ${errors.confirm ? "ring-2 ring-red-400" : ""
                                    }`}
                                placeholder="Confirm password"
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm((s) => !s)}
                                aria-label={showConfirm ? "Hide password" : "Show password"}
                                className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
                            >
                                {showConfirm ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {errors.confirm && <div className="text-xs text-red-200 mb-2">{errors.confirm}</div>}

                        <div className="flex items-center gap-2 mt-2 mb-4">
                            <input
                                id="agree"
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="h-4 w-4 rounded text-blue-600"
                            />
                            <label htmlFor="agree" className="text-sm text-white/90">
                                I agree to the <a href="/terms" className="underline">Terms & Conditions</a>
                            </label>
                        </div>
                        {errors.agreed && <div className="text-xs text-red-200 mb-2">{errors.agreed}</div>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 active:scale-95 transition text-gray-900 font-medium px-4 py-2 rounded-md"
                        >
                            {loading ? (
                                <svg
                                    className="animate-spin h-5 w-5 text-gray-900"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 100 24v-4l-3 3 3 3v-4a8 8 0 01-8-8z"></path>
                                </svg>
                            ) : null}
                            <span>{loading ? "Registering..." : "Register"}</span>
                        </button>

                        <div className="mt-4 text-sm text-white/90 text-center">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-200 font-semibold hover:underline">
                                Sign in
                            </a>
                        </div>
                    </form>

                    <div className="mt-6 text-center text-xs text-white/70">
                        <p>We take your privacy seriously. Data is used for complaint routing only.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
