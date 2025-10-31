
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { toast } from "sonner";

// Define a constant version that matches the script tag version
const APP_VERSION = '20250424';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [keySequence, setKeySequence] = useState<string>("");
  const ADMIN_KEY_SEQUENCE = "propicoadmin";

  useEffect(() => {
    // Handle version compatibility
    const checkVersion = () => {
      const scriptElement = document.querySelector('script[src^="https://cdn.gpteng.co/gptengineer.js"]');
      if (scriptElement) {
        const scriptSrc = scriptElement.getAttribute('src');
        if (scriptSrc && scriptSrc.includes('v=')) {
          const scriptVersion = scriptSrc.split('v=')[1].split('&')[0];
          // Store the version in localStorage for reference
          localStorage.setItem('app_version', APP_VERSION);
          console.log(`App version: ${APP_VERSION}, Script version: ${scriptVersion}`);
        }
      }
    };
    
    checkVersion();
    
    // Original key sequence handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[a-z]$/i.test(e.key)) {
        setKeySequence(prev => {
          const newSequence = (prev + e.key).toLowerCase().slice(-ADMIN_KEY_SEQUENCE.length);
          
          if (newSequence === ADMIN_KEY_SEQUENCE) {
            // Set admin mode in session storage
            sessionStorage.setItem("propicoAdminMode", "true");
            
            // Navigate to admin settings
            window.location.href = "/admin-settings";
            
            toast.success("Admin mode activated", {
              description: "You've been redirected to the admin settings page."
            });
          }
          
          return newSequence;
        });
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [ADMIN_KEY_SEQUENCE]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={routes} />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
