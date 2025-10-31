import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const RegisterComplaint = () => {
  const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    priority: "medium",
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setFormData(prev => ({ ...prev, user_id: user.id }));
      }
    };
    getUser();
  }, []);

  const CATEGORY_OPTIONS = [
    "Roads & Infrastructure",
    "Sanitation",
    "Water",
    "Electricity",
    "Health & Safety",
    "Environment",
    "Public Property",
    "Emergency",
  ];

  const getDepartmentEmail = (category: string) => {
    const departmentEmails: Record<string, string> = {
      "Roads & Infrastructure": "xenr1mccchd@nic.in",
      "Sanitation": "comm-mcc-chd@nic.in",
      "Water": "comm-mcc-chd@nic.in",
      "Electricity": "comm-mcc-chd@nic.in",
      "Health & Safety": "comm-mcc-chd@nic.in",
      "Environment": "cf-chd@chd.nic.in",
      "Public Property": "comm-mcc-chd@nic.in",
      "Emergency": "dgp-chd@nic.in",
    };
    return departmentEmails[category] || "comm-mcc-chd@nic.in";
  };

  const saveComplaintToDatabase = async (complaintId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please sign in to submit a complaint");
        return false;
      }

      const { error } = await supabase.from("complaints").insert([
        {
          complaint_id: complaintId,
          user_id: user.id,
          title: formData.title,
          category: formData.category,
          location: formData.location,
          description: formData.description,
          status: "pending",
          priority: formData.priority,
          photo_url: photoPreview,
        },
      ]);

      if (error) {
        console.error("Error saving complaint:", error);
        toast.error("Failed to save complaint. Please try again.");
        return false;
      }

      toast.success("Complaint submitted successfully!");
      return true;
    } catch (error) {
      console.error("Error saving complaint:", error);
      toast.error("Failed to save complaint. Please try again.");
      return false;
    }
  };

  const generateReferenceId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `CE-${timestamp}-${random}`;
  };

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject(new Error("Geolocation not supported"));
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000 });
    });
  };

  const uploadPhoto = async (file: File, referenceId: string) => {
    try {
      const filePath = `${referenceId}/${file.name}`;
      // Try Supabase storage upload (bucket: complaint-photos)
      const { data, error } = await supabase.storage.from("complaint-photos").upload(filePath, file, { upsert: false });
      if (error) throw error;
      const { data: publicData } = await supabase.storage.from("complaint-photos").getPublicUrl(filePath);
      return publicData.publicUrl;
    } catch (err) {
      // Fallback to local object URL (non-persistent)
      console.warn("Storage upload failed, using local preview", err);
      return URL.createObjectURL(file);
    }
  };

  const handlePhotoChange = (f?: File) => {
    if (!f) return;
    setPhotoFile(f);
    setPhotoPreview(URL.createObjectURL(f));
  };

  const handleRegisterClick = async () => {
    // Full submission workflow per Civic Eye spec
    try {
      if (!formData.category) {
        toast.error("Please select a category");
        return;
      }
      if (!photoFile) {
        toast.error("Please upload a photo of the issue (required)");
        return;
      }

      setLoading(true);

      // Get current user (robustly): try getUser(), then getSession(), then localStorage fallback
      let user = (await supabase.auth.getUser()).data?.user;
      if (!user) {
        user = (await supabase.auth.getSession()).data?.session?.user || null;
      }
      if (!user) {
        // Try quick localStorage inspect for older token key
        try {
          const token = localStorage.getItem('supabase.auth.token') || localStorage.getItem('sb:token');
          if (token) {
            // There's a token present but client didn't return a user yet — attempt to refresh
            await supabase.auth.refreshSession();
            user = (await supabase.auth.getUser()).data?.user || (await supabase.auth.getSession()).data?.session?.user || null;
          }
        } catch (e) {
          // ignore
        }
      }

      if (!user) {
        setLoading(false);
        toast.error("Please login to submit a complaint");
        return;
      }

      // Fetch profile from 'profiles' table if exists (cast to any to avoid strict typed Postgrest client errors)
      const { data: profile } = await supabase.from<any, any>("profiles").select("full_name,email,mobile_number,location_lat,location_lng,profile_completed,location_captured").eq("id", user.id).single();
      const profileAny: any = profile;

      if (!profileAny || !profileAny.profile_completed) {
        setLoading(false);
        toast.error("Please complete your profile (mobile & location) before filing a complaint");
        // navigate to profile page could be done here if route exists
        return;
      }

      // Capture location with geolocation API (fallback to profile)
      let lat: number | null = null;
      let lng: number | null = null;
      try {
        const pos = await getCurrentPosition();
        lat = parseFloat(pos.coords.latitude.toFixed(6));
        lng = parseFloat(pos.coords.longitude.toFixed(6));
      } catch (geoErr) {
        // fallback to profile location
        lat = profileAny.location_lat || null;
        lng = profileAny.location_lng || null;
      }

      if (!lat || !lng) {
        setLoading(false);
        toast.error("Unable to capture location. Please ensure location is enabled in your profile or allow access.");
        return;
      }

      const referenceId = generateReferenceId();

      // Upload photo
      const photoUrl = await uploadPhoto(photoFile as File, referenceId);

      const googleMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
      const departmentEmail = getDepartmentEmail(formData.category);

      const complaintRecord = {
        reference_id: referenceId,
        complaint_id: referenceId,
        title: `Complaint - ${formData.category}`,
        user_id: user.id,
        user_name: profileAny.full_name || user.email || "",
        user_email: profileAny.email || user.email || "",
        user_mobile: profileAny.mobile_number || "",
        category: formData.category,
        ai_suggested_category: null,
        photo_url: photoUrl,
        location_lat: lat,
        location_lng: lng,
        location: lat && lng ? `${lat},${lng}` : "",
        google_maps_link: googleMapsLink,
        department_email: departmentEmail,
        description: formData.description || null,
        status: "Submitted",
        created_date: new Date().toISOString(),
        created_by: user.email || null,
      };

      const { error: insertError } = await supabase.from("complaints").insert(complaintRecord);
      if (insertError) throw insertError;

      // Success
      toast.success(`Complaint submitted — Reference: ${referenceId}`);

      // Attempt to notify department via mailer service (best-effort)
      try {
        const MAILER_URL = import.meta.env.VITE_MAILER_URL || 'http://127.0.0.1:5000';
        await fetch(`${MAILER_URL}/api/send-complaint`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: profileAny.full_name || user.email || '',
            email: profileAny.email || user.email || '',
            category: formData.category,
            description: formData.description || '',
            location: `${lat},${lng}`,
            imageUrl: photoUrl,
          }),
        });
      } catch (mailErr) {
        console.warn('Mailer notification failed (non-blocking)', mailErr);
      }
      // Optionally redirect to My Complaints or show reference
      // navigate('/my-complaints');
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--theme-background)]">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Register New Complaint</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-sm text-gray-700">Provide the details below and click Register Complaint.</p>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(val) => setFormData((s) => ({ ...s, category: val }))}>
                      <SelectTrigger id="category" className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORY_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Description (optional)</Label>
                    <Textarea id="description" value={formData.description} onChange={(e) => setFormData((s) => ({ ...s, description: (e.target as HTMLTextAreaElement).value }))} placeholder="Describe the issue" />
                  </div>

                  <div>
                    <Label htmlFor="photo">Photo (required)</Label>
                    <input id="photo" type="file" accept="image/*" onChange={(e) => handlePhotoChange(e.target.files?.[0])} className="mt-2" />
                    {photoPreview && (
                      <div className="mt-2">
                        <img src={photoPreview} alt="preview" className="max-w-xs rounded" />
                      </div>
                    )}
                  </div>

                  <Button type="button" className="w-full" onClick={handleRegisterClick} disabled={loading}>
                    {loading ? "Submitting..." : "Register Complaint"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RegisterComplaint;
