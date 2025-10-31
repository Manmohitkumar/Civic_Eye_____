
import React from "react";
import { CheckCircle2, BugPlay, BugOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import GoogleSheetsSetup from "@/components/GoogleSheetsSetup";

interface AdminPanelProps {
  googleFormUrl: string;
  setGoogleFormUrl: (url: string) => void;
  urlSaved: boolean;
  showUrlInput: boolean;
  toggleUrlInput: () => void;
  showSetupInstructions: boolean;
  toggleSetupInstructions: () => void;
  debugMode: boolean;
  toggleDebugMode: () => void;
  saveGoogleFormUrl: () => void;
  exitAdminMode: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  googleFormUrl,
  setGoogleFormUrl,
  urlSaved,
  showUrlInput,
  toggleUrlInput,
  showSetupInstructions,
  toggleSetupInstructions,
  debugMode,
  toggleDebugMode,
  saveGoogleFormUrl,
  exitAdminMode,
}) => {
  return (
    <div className="mt-10 border-t pt-6">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-lg theme-primary-text">Admin Settings</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={exitAdminMode}
          className="text-xs"
        >
          Exit Admin Mode
        </Button>
      </div>
      
      <div className="mt-4">
        {!urlSaved ? (
          <Button 
            type="button" 
            onClick={toggleUrlInput}
            variant="outline"
            className="text-sm"
          >
            Configure Google Form Integration
          </Button>
        ) : (
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center text-green-600 text-sm">
              <CheckCircle2 size={16} className="mr-1" />
              Google Form integration is active
            </div>
            <Button
              type="button"
              onClick={toggleUrlInput}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              Reconfigure
            </Button>
          </div>
        )}
        
        {showUrlInput && (
          <div className="mt-3 p-4 bg-gray-50 rounded-lg">
            <label htmlFor="googleFormUrl" className="text-sm font-medium">
              Google Form URL (with field IDs)
            </label>
            <div className="flex mt-1">
              <Input
                id="googleFormUrl"
                type="text"
                value={googleFormUrl}
                onChange={(e) => setGoogleFormUrl(e.target.value)}
                placeholder="https://docs.google.com/forms/.../formResponse?emailField=entry.123&addressField=entry.456&detailsField=entry.789"
                className="text-sm"
              />
              <Button 
                type="button" 
                onClick={saveGoogleFormUrl}
                className="ml-2"
                variant="default"
                size="sm"
              >
                Save
              </Button>
            </div>
            
            <div className="mt-3 flex items-center justify-between">
              <Button
                type="button"
                onClick={toggleDebugMode}
                variant={debugMode ? "destructive" : "outline"}
                size="sm"
                className="flex items-center"
              >
                {debugMode ? (
                  <>
                    <BugOff size={14} className="mr-1" />
                    Disable Debug Mode
                  </>
                ) : (
                  <>
                    <BugPlay size={14} className="mr-1" />
                    Enable Debug Mode
                  </>
                )}
              </Button>
              {debugMode && (
                <span className="ml-2 text-xs text-amber-600">
                  Debug mode is enabled. Check browser console for submission details.
                </span>
              )}
            </div>
            
            <div className="mt-4 bg-red-50 p-3 rounded border border-red-200">
              <p className="text-xs font-semibold text-red-700">
                ⚠️ IMPORTANT: Your Google Form URL MUST include field IDs or your submissions will be BLANK!
              </p>
              <p className="text-xs text-red-600 mt-1">
                Format: https://docs.google.com/forms/.../formResponse?emailField=entry.123456&addressField=entry.789012&detailsField=entry.345678
              </p>
            </div>
            
            <div className="mt-2 flex justify-between items-center">
              <p className="text-xs text-gray-500">
                Not sure how to set up Google Forms integration?
              </p>
              <Button
                type="button"
                onClick={toggleSetupInstructions}
                variant="link"
                size="sm"
                className="text-xs"
              >
                {showSetupInstructions ? "Hide Instructions" : "Show Instructions"}
              </Button>
            </div>
            
            {showSetupInstructions && (
              <div className="mt-3 border-t pt-3">
                <GoogleSheetsSetup />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
