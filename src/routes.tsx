
import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import RegisterComplaint from "./pages/RegisterComplaint";
import TrackComplaints from "./pages/TrackComplaints";
import LiveMap from "./pages/LiveMap";
import Reports from "./pages/Reports";
import AIQuery from "./pages/AIQuery";
import Feedback from "./pages/Feedback";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
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
    path: "*",
    element: <NotFound />,
  },
]);
