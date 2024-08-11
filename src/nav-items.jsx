import { Home, Heart, Calendar, Gift } from "lucide-react";
import Index from "./pages/Index.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Our Story",
    to: "/our-story",
    icon: <Heart className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Wedding Day",
    to: "/wedding-day",
    icon: <Calendar className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Registry",
    to: "/registry",
    icon: <Gift className="h-4 w-4" />,
    page: <Index />,
  },
];
