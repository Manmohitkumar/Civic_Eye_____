import { LucideIcon } from "lucide-react";
import { ClipboardPen, Search, FileSignature, Banknote, Calendar, FileText, Home, Clock, Handshake, Key } from "lucide-react";

export interface ProcessStep {
  title: string;
  description: string;
  icon: LucideIcon;
  timeline: string;
  iconColor: string;
  bgColor: string;
  circleColor: string;
}

// Updated landlord process steps with more consistent, premium colors
export const landlordProcessSteps: ProcessStep[] = [
  {
    title: "Get Our Offer",
    description: "We'll provide your guaranteed rental income offer within 48 hours after property details are submitted.",
    icon: ClipboardPen,
    timeline: "Within 48 hours",
    iconColor: "text-[var(--theme-primary)]",
    bgColor: "bg-[var(--theme-primary-light)]",
    circleColor: "bg-[var(--theme-primary)]"
  },
  {
    title: "Sign the Agreement",
    description: "Accept your guaranteed rental offer. Our transparent contract clearly outlines all terms with no hidden clauses.",
    icon: FileSignature,
    timeline: "1-2 days",
    iconColor: "text-[var(--theme-primary)]",
    bgColor: "bg-[var(--theme-primary-light)]",
    circleColor: "theme-accent-bg"
  },
  {
    title: "Make Property Rent-Ready",
    description: "Our team will inspect and handle necessary repairs and improvements to maximize your property's rental value.",
    icon: Home,
    timeline: "7-14 days",
    iconColor: "text-[var(--theme-primary)]",
    bgColor: "bg-[var(--theme-primary-light)]",
    circleColor: "bg-[var(--theme-primary)]"
  },
  {
    title: "Receive Guaranteed Rent",
    description: "Payments are deposited directly to your account on the 5th of each month, regardless of tenant status.",
    icon: Banknote,
    timeline: "Monthly",
    iconColor: "text-[var(--theme-primary)]",
    bgColor: "bg-[var(--theme-primary-light)]",
    circleColor: "theme-accent-bg"
  }
];

// Tenant process steps remain unchanged
export const tenantProcessSteps: ProcessStep[] = [
  {
    title: "Browse Listings",
    description: "Explore our curated selection of premium properties.",
    icon: Search,
    timeline: "Anytime",
    iconColor: "text-[var(--theme-primary)]",
    bgColor: "bg-[var(--theme-primary-light)]",
    circleColor: "bg-[var(--theme-primary)]"
  },
  {
    title: "Schedule Viewing",
    description: "Book a convenient time to visit properties you like.",
    icon: Calendar,
    timeline: "Same Day",
    iconColor: "text-[var(--theme-primary)]",
    bgColor: "bg-[var(--theme-primary-light)]",
    circleColor: "theme-accent-bg"
  },
  {
    title: "Apply Online",
    description: "Complete our simple application process.",
    icon: FileText,
    timeline: "10 minutes",
    iconColor: "text-[var(--theme-primary)]",
    bgColor: "bg-[var(--theme-primary-light)]",
    circleColor: "bg-[var(--theme-primary)]"
  },
  {
    title: "Move In",
    description: "Get your keys and enjoy your new home.",
    icon: Home,
    timeline: "As scheduled",
    iconColor: "text-[var(--theme-primary)]",
    bgColor: "bg-[var(--theme-primary-light)]",
    circleColor: "theme-accent-bg"
  }
];
