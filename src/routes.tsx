import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const RegisterComplaint = lazy(() => import("./pages/RegisterComplaint"));
const TrackComplaints = lazy(() => import("./pages/TrackComplaints"));
const LiveMap = lazy(() => import("./pages/LiveMap"));
const Reports = lazy(() => import("./pages/Reports"));
const AIQuery = lazy(() => import("./pages/AIQuery"));
const Feedback = lazy(() => import("./pages/Feedback"));
const Auth = lazy(() => import("./pages/Auth"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/register-complaint",
    element: <RegisterComplaint />,
  },
  {
    path: "/track-complaints",
    element: <TrackComplaints />,
  },
  {
    path: "/live-map",
    element: <LiveMap />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: "/ai-query",
    element: <AIQuery />,
  },
  {
    path: "/feedback",
    element: <Feedback />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
