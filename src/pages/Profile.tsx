import { useState, useEffect } from "react";
import axios from "axios";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

interface User {
    full_name: string;
    email: string;
    mobile_number: string;
    location_lat: string;
    location_lng: string;
    profile_completed: boolean;
    stats?: {
        total: number;
        resolved: number;
        pending: number;
    };
}

const Profile = () => {
    // State for real-time complaint statistics
    const [stats, setStats] = useState({
        total: 0,
        resolved: 0,
        pending: 0
    });

    const [user, setUser] = useState<User>({
        full_name: "",
        email: "",
        mobile_number: "",
        location_lat: "",
        location_lng: "",
        profile_completed: false,
        stats: {
            total: 0,
            resolved: 0,
            pending: 0
        }
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [coords, setCoords] = useState({ lat: "", lng: "" });

    // Load user data and complaint statistics
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch complaints statistics
                const complaintsResponse = await fetch('/api/complaints/stats');
                const complaintsData = await complaintsResponse.json();
                setStats({
                    total: complaintsData.total || 0,
                    resolved: complaintsData.resolved || 0,
                    pending: complaintsData.pending || 0
                });

                // For development, using session storage to persist edits
                const savedUser = sessionStorage.getItem('user_profile');
                if (savedUser) {
                    const parsedUser = JSON.parse(savedUser);
                    setUser(parsedUser);
                } else {
                    const defaultUser = {
                        full_name: "John Doe",
                        email: "john.doe@example.com",
                        mobile_number: "",
                        location_lat: "",
                        location_lng: "",
                        profile_completed: false,
                        stats: {
                            total: 0,
                            resolved: 0,
                            pending: 0
                        }
                    };
                    setUser(defaultUser);
                    sessionStorage.setItem('user_profile', JSON.stringify(defaultUser));
                }
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };
        fetchData();
    }, []);    // Capture current location
    const captureLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        setStatus("Capturing location...");
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({
                    lat: position.coords.latitude.toFixed(6),
                    lng: position.coords.longitude.toFixed(6),
                });
                setStatus("Location captured successfully ✅");
            },
            (error) => {
                console.error(error);
                setStatus("Failed to capture location ❌");
            },
            { enableHighAccuracy: true }
        );
    };

    // Save updated profile
    const handleSave = async () => {
        if (!user.full_name || !user.email || !user.mobile_number) {
            alert("Please fill in all required fields!");
            return;
        }

        setLoading(true);
        try {
            const updatedUser = {
                ...user,
                location_lat: coords.lat || user.location_lat,
                location_lng: coords.lng || user.location_lng,
                profile_completed: true,
                stats: stats // Use real-time stats
            };

            // Save to session storage for development
            sessionStorage.setItem('user_profile', JSON.stringify(updatedUser));

            // In production, uncomment this:
            // await fetch("/api/user/update", {
            //   method: 'PUT',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify(updatedUser)
            // });

            setUser(updatedUser);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Profile update error:", error);
            alert("Error updating profile");
        } finally {
            setLoading(false);
        }
    }; return (
        <div className="min-h-screen bg-[var(--theme-background)]">
            <DashboardHeader />
            <div className="flex">
                <DashboardSidebar />
                <main className="flex-1 p-8">
                    <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-xl">
                        <h1 className="text-2xl font-semibold text-blue-700 mb-4">👤 My Profile</h1>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {/* Stats Cards */}
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-blue-800 mb-2">Total Complaints</h3>
                                <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-green-800 mb-2">Resolved</h3>
                                <p className="text-2xl font-bold text-green-900">{stats.resolved}</p>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-yellow-800 mb-2">Pending</h3>
                                <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    value={user.full_name}
                                    onChange={(e) => setUser({ ...user, full_name: e.target.value })}
                                    className="mt-1 w-full border rounded-lg p-2"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    className="mt-1 w-full border rounded-lg p-2"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                <input
                                    type="text"
                                    maxLength={10}
                                    value={user.mobile_number}
                                    onChange={(e) => setUser({ ...user, mobile_number: e.target.value })}
                                    className="mt-1 w-full border rounded-lg p-2"
                                    placeholder="Enter 10-digit mobile number"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={captureLocation}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    📍 Capture Location
                                </button>
                                {status && <p className="text-sm text-gray-600">{status}</p>}
                            </div>

                            {coords.lat && (
                                <div className="text-sm text-gray-700">
                                    Latitude: <b>{coords.lat}</b> | Longitude: <b>{coords.lng}</b>
                                </div>
                            )}

                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mt-4 disabled:opacity-50"
                            >
                                {loading ? "Saving..." : "💾 Save Profile"}
                            </button>
                        </div>

                        <div className="mt-6 border-t pt-4">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">📊 Profile Status</h2>
                            <p>
                                {user.profile_completed ? (
                                    <span className="text-green-600 font-semibold">✅ Completed</span>
                                ) : (
                                    <span className="text-red-600 font-semibold">❌ Incomplete</span>
                                )}
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Profile;
