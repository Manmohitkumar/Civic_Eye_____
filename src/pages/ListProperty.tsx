
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyForm from "@/components/property/PropertyForm";
import AdminPanel from "@/components/property/AdminPanel";
import SuccessView from "@/components/property/SuccessView";

const GOOGLE_FORM_URL_KEY = "propertyFormGoogleFormUrl";
// Secret key combination to show admin panel
const ADMIN_KEY_SEQUENCE = "propicoadmin";

const ListProperty = () => {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleFormUrl, setGoogleFormUrl] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [showSetupInstructions, setShowSetupInstructions] = useState(false);
  const [urlSaved, setUrlSaved] = useState(false);
  const [keySequence, setKeySequence] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    const savedUrl = localStorage.getItem(GOOGLE_FORM_URL_KEY);
    if (savedUrl) {
      setGoogleFormUrl(savedUrl);
      setUrlSaved(true);
    }
    
    const isAdminMode = sessionStorage.getItem("propicoAdminMode") === "true";
    setShowAdmin(isAdminMode);
    
    const isDebugMode = localStorage.getItem("propicoDebugMode") === "true";
    setDebugMode(isDebugMode);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[a-z]$/i.test(e.key)) {
        setKeySequence(prev => {
          const newSequence = (prev + e.key).toLowerCase().slice(-ADMIN_KEY_SEQUENCE.length);
          
          if (newSequence === ADMIN_KEY_SEQUENCE) {
            setShowAdmin(true);
            sessionStorage.setItem("propicoAdminMode", "true");
            toast({
              title: "Admin mode activated",
              description: "You can now configure Google Sheets integration."
            });
          }
          
          return newSequence;
        });
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleUrlInput = () => {
    setShowUrlInput(!showUrlInput);
    setShowSetupInstructions(false);
  };

  const toggleSetupInstructions = () => {
    setShowSetupInstructions(!showSetupInstructions);
  };

  const toggleDebugMode = () => {
    const newDebugMode = !debugMode;
    setDebugMode(newDebugMode);
    localStorage.setItem("propicoDebugMode", newDebugMode.toString());
    toast({
      title: newDebugMode ? "Debug mode enabled" : "Debug mode disabled",
      description: newDebugMode 
        ? "Form submission details will be logged to the console." 
        : "Form submission details will no longer be logged.",
    });
  };

  const saveGoogleFormUrl = () => {
    if (googleFormUrl) {
      localStorage.setItem(GOOGLE_FORM_URL_KEY, googleFormUrl);
      setUrlSaved(true);
      toast({
        title: "Google Form URL saved",
        description: "Your form submissions will now be sent to this Google Form.",
      });
    }
  };
  
  const exitAdminMode = () => {
    setShowAdmin(false);
    sessionStorage.removeItem("propicoAdminMode");
    toast({
      title: "Admin mode deactivated",
      description: "Google Form configuration is now hidden."
    });
  };

  const extractFieldIdsFromUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const params = parsedUrl.searchParams;
      
      const fieldIds = {
        email: params.get('emailField') || '',
        address: params.get('addressField') || '',
        details: params.get('detailsField') || ''
      };
      
      if (debugMode) {
        console.log("Extracted field IDs from URL parameters:", fieldIds);
      }
      
      return fieldIds;
    } catch (error) {
      console.error("Error parsing URL for field IDs:", error);
      return { email: '', address: '', details: '' };
    }
  };

  const submitToGoogleForm = async (formData: {
    email: string;
    address: string;
    additionalDetails: string;
  }) => {
    try {
      if (!googleFormUrl) return false;
      
      if (debugMode) {
        console.log("Attempting to submit to Google Form:", googleFormUrl);
        console.log("Form data:", formData);
      }
      
      const url = new URL(googleFormUrl);
      
      const isFormResponseUrl = url.pathname.includes('/formResponse');
      if (!isFormResponseUrl) {
        toast({
          title: "Error: Incorrect Google Form URL",
          description: "URL must end with '/formResponse', not '/viewform' or '/previewResponse'",
          variant: "destructive"
        });
        console.error("Incorrect Google Form URL format. Must end with '/formResponse'");
        return false;
      }
      
      const extractedFieldIds = extractFieldIdsFromUrl(googleFormUrl);
      
      if (!extractedFieldIds.email || !extractedFieldIds.address || !extractedFieldIds.details) {
        if (debugMode) {
          console.error("Missing field IDs in Google Form URL", extractedFieldIds);
        }
        toast({
          title: "Error: Missing field IDs",
          description: "Please add field IDs to your Google Form URL. See setup instructions.",
          variant: "destructive"
        });
        return false;
      }
      
      const entryIds = {
        email: extractedFieldIds.email,
        address: extractedFieldIds.address,
        details: extractedFieldIds.details
      };
      
      if (debugMode) {
        console.log("Using entry IDs:", entryIds);
      }
      
      const formPayload = new URLSearchParams();
      formPayload.append(entryIds.email, formData.email);
      formPayload.append(entryIds.address, formData.address);
      formPayload.append(entryIds.details, formData.additionalDetails);
      
      if (debugMode) {
        console.log("Form payload being submitted:", formPayload.toString());
      }
      
      const fetchOptions: RequestInit = {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formPayload
      };
      
      const response = await fetch(url.toString(), fetchOptions);
      
      if (debugMode) {
        console.log("Form submission response:", response);
      }
      
      return true;
    } catch (error) {
      console.error('Error submitting to Google Form:', error);
      toast({
        title: "Error submitting to Google Form",
        description: "There was a problem sending your information. Your data has been saved locally.",
        variant: "destructive"
      });
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const submission = {
      email,
      address,
      additionalDetails,
      timestamp: new Date().toISOString()
    };
    
    if (debugMode) {
      console.log("Form submission started:", submission);
    }
    
    try {
      const existingSubmissions = JSON.parse(localStorage.getItem("propertySubmissions") || "[]");
      existingSubmissions.push(submission);
      localStorage.setItem("propertySubmissions", JSON.stringify(existingSubmissions));
      
      if (debugMode) {
        console.log("Saved to localStorage successfully");
      }
      
      let googleFormSuccess = false;
      if (googleFormUrl) {
        googleFormSuccess = await submitToGoogleForm({
          email,
          address,
          additionalDetails
        });
        
        if (googleFormSuccess) {
          console.log("Successfully submitted to Google Form");
        } else {
          console.warn("Google Form submission may have failed, but local data was saved");
        }
      }
      
      setSubmissionSuccess(true);
      toast({
        title: "Property submission successful!",
        description: "Your information has been recorded and sent to our team.",
        variant: "default"
      });
      
      setEmail("");
      setAddress("");
      setAdditionalDetails("");
    } catch (error) {
      toast({
        title: "Error saving submission",
        description: "There was a problem saving your information. Please try again.",
        variant: "destructive"
      });
      console.error("Error saving submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmissionSuccess(false);
  };

  if (submissionSuccess) {
    return <SuccessView resetForm={resetForm} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 theme-primary-text">
                List Your Property
              </h1>
              <div className="h-1 w-16 theme-accent-bg mx-auto rounded"></div>
              <p className="mt-6 text-lg text-gray-600">
                Start your journey to hassle-free rental income by sharing your property details below.
              </p>
            </div>

            <PropertyForm
              email={email}
              setEmail={setEmail}
              address={address}
              setAddress={setAddress}
              additionalDetails={additionalDetails}
              setAdditionalDetails={setAdditionalDetails}
              isSubmitting={isSubmitting}
              handleSubmit={handleSubmit}
            />

            <div className="mt-8 bg-gray-50 rounded-lg p-6 text-sm text-gray-500">
              <p className="font-medium mb-2">Your privacy matters to us</p>
              <p>We value your privacy and will never share your information with third parties without your consent. By submitting this form, you agree to our <Link to="/privacy-policy" className="text-purple-600 hover:underline">privacy policy</Link>.</p>
            </div>
            
            {showAdmin && (
              <AdminPanel
                googleFormUrl={googleFormUrl}
                setGoogleFormUrl={setGoogleFormUrl}
                urlSaved={urlSaved}
                showUrlInput={showUrlInput}
                toggleUrlInput={toggleUrlInput}
                showSetupInstructions={showSetupInstructions}
                toggleSetupInstructions={toggleSetupInstructions}
                debugMode={debugMode}
                toggleDebugMode={toggleDebugMode}
                saveGoogleFormUrl={saveGoogleFormUrl}
                exitAdminMode={exitAdminMode}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListProperty;
