import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Feedback = () => {
  const [dummy, setDummy] = useState(false);
  const openFeedbackForm = () => {
    const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeUVx-0NEI-U5QiAuDXqo6SKxciP3ZMzi0-rnpYvFEjnWx2vw/viewform?usp=dialog";
    // Redirect user to the external Google Form
    window.location.href = googleFormUrl;
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
                <div className="space-y-6">
                  <p className="text-sm text-gray-700">Click the button below to open our feedback form.</p>
                  <Button type="button" className="w-full" onClick={openFeedbackForm}>
                    Open Feedback Form
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

export default Feedback;
