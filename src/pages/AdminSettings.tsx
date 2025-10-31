
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import GoogleSheetsSetup from "@/components/GoogleSheetsSetup";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdminSettings = () => {
  const [googleFormUrl, setGoogleFormUrl] = useLocalStorage<string>("googleFormUrl", "");
  const [tempUrl, setTempUrl] = useState(googleFormUrl);
  const [debugMode, setDebugMode] = useLocalStorage<boolean>("debugMode", false);
  const [showSetupInstructions, setShowSetupInstructions] = useState(false);
  const navigate = useNavigate();
  
  // Check if admin mode is active
  useEffect(() => {
    const isAdmin = sessionStorage.getItem("propicoAdminMode");
    if (!isAdmin) {
      navigate("/");
      toast.error("You don't have access to this page");
    }
  }, [navigate]);
  
  const saveGoogleFormUrl = () => {
    if (!tempUrl) {
      toast.error("Please enter a Google Form URL");
      return;
    }
    
    // Basic validation
    if (!tempUrl.includes("docs.google.com/forms") || !tempUrl.includes("/formResponse")) {
      toast.error("Invalid Google Form URL. Please make sure it ends with /formResponse");
      return;
    }
    
    // Check if the URL contains the required field parameters
    if (!tempUrl.includes("nameField=") || !tempUrl.includes("phoneField=") || !tempUrl.includes("cityField=")) {
      toast.error("Missing required field IDs. Please add nameField, phoneField, and cityField parameters to the URL");
      return;
    }
    
    setGoogleFormUrl(tempUrl);
    toast.success("Google Form URL saved successfully");
  };
  
  const exitAdminMode = () => {
    sessionStorage.removeItem("propicoAdminMode");
    navigate("/");
    toast.success("Exited admin mode", {
      description: "You've been redirected to the homepage."
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold theme-primary-text">Admin Settings</h1>
        <Button 
          onClick={exitAdminMode}
          variant="destructive"
          className="flex items-center"
        >
          Exit Admin Mode
        </Button>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-semibold mb-4 theme-primary-text">Google Form Integration</h2>
        
        <div className="mb-6">
          <label htmlFor="googleFormUrl" className="block text-sm font-medium mb-2">
            Google Form URL (with field IDs)
          </label>
          <div className="flex">
            <Input
              id="googleFormUrl"
              type="text"
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              placeholder="https://docs.google.com/forms/.../formResponse?nameField=entry.123&phoneField=entry.456&cityField=entry.789"
              className="flex-1"
            />
            <Button 
              type="button" 
              onClick={saveGoogleFormUrl}
              className="ml-2"
            >
              Save
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Your Google Form URL must end with /formResponse and include field IDs for name, phone, and city
          </p>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={debugMode}
                onChange={() => setDebugMode(!debugMode)}
                className="sr-only"
              />
              <div className={`relative w-10 h-5 transition-colors duration-200 ease-in-out rounded-full ${debugMode ? 'bg-green-500' : 'bg-gray-200'}`}>
                <div className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${debugMode ? 'transform translate-x-5' : ''}`} />
              </div>
              <span className="ml-2 text-sm font-medium">Debug Mode</span>
            </label>
            
            {debugMode && (
              <p className="text-xs text-amber-600">
                Debug mode is enabled. Check browser console for submission details.
              </p>
            )}
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Need help setting up the Google Forms integration?
            </p>
            <Button
              type="button"
              onClick={() => setShowSetupInstructions(!showSetupInstructions)}
              variant="outline"
              size="sm"
            >
              {showSetupInstructions ? "Hide Instructions" : "Show Instructions"}
            </Button>
          </div>
          
          {showSetupInstructions && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg">
              <GoogleSheetsSetup />
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        <p>Current status:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Google Form Integration: {googleFormUrl ? "Configured ✅" : "Not configured ❌"}</li>
          <li>Debug Mode: {debugMode ? "Enabled 🐞" : "Disabled"}</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSettings;
