import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { feedbackSchema } from "@/lib/validationSchemas";

const Feedback = () => {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback_text: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validation = feedbackSchema.safeParse({ ...formData, rating });
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please login to submit feedback");
        navigate("/auth");
        return;
      }

      const { error } = await supabase.from("feedback").insert([
        {
          name: validation.data.name,
          email: validation.data.email,
          feedback_text: validation.data.feedback_text,
          rating: validation.data.rating,
          user_id: user.id,
        },
      ]);

      if (error) throw error;

      toast.success("Thank you for your feedback!");
      setFormData({ name: "", email: "", feedback_text: "" });
      setRating(0);
    } catch (error: any) {
      toast.error("Failed to submit feedback");
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
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Give Feedback</CardTitle>
                <p className="text-gray-600">Help us improve our service</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label>Rating *</Label>
                    <div className="flex gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            size={32}
                            className={star <= rating ? "fill-[var(--theme-accent)] text-[var(--theme-accent)]" : "text-gray-300"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="feedback">Feedback *</Label>
                    <Textarea
                      id="feedback"
                      value={formData.feedback_text}
                      onChange={(e) => setFormData({ ...formData, feedback_text: e.target.value })}
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading || rating === 0}>
                    {loading ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Feedback;
