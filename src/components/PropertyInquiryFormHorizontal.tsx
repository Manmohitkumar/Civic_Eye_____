
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

// === Hardcoded Google Form Integration Values ===
// These now match your exact form setup.

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfdwsalA44HV-wefZkgMSVnvE88v_FeHXfLOBgnbneeB8Kccw/formResponse";
const FIELD_NAME = "entry.637612217";
const FIELD_PHONE = "entry.1679878421";
const FIELD_EMAIL = "entry.949217312";
const FIELD_CITY = "entry.2083018139";

interface PropertyInquiryFormHorizontalProps {
  ctaLabel?: string;
}

const PropertyInquiryFormHorizontal = ({
  ctaLabel = "Get Free Evaluation",
}: PropertyInquiryFormHorizontalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitToGoogleForms = () => {
    // Prepare the form body using the field constants
    const form = document.createElement("form");
    form.method = "POST";
    form.action = GOOGLE_FORM_URL;
    form.target = "hidden-form-iframe";

    const addHiddenInput = (name: string, value: string) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    };

    addHiddenInput(FIELD_NAME, formData.name);
    addHiddenInput(FIELD_PHONE, formData.phone);
    addHiddenInput(FIELD_EMAIL, formData.email);
    addHiddenInput(FIELD_CITY, formData.city);

    // Create hidden iframe to submit form
    let iframe = document.getElementById("hidden-form-iframe") as
      | HTMLIFrameElement
      | null;
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.name = "hidden-form-iframe";
      iframe.id = "hidden-form-iframe";
      document.body.appendChild(iframe);
    }

    document.body.appendChild(form);
    form.submit();

    setTimeout(() => {
      if (form.parentNode) form.parentNode.removeChild(form);
      // Don't remove the iframe if it already exists, to avoid errors if multiple submits happen quickly
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.city
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    submitToGoogleForms();

    setTimeout(() => {
      toast.success(
        <div className="flex items-center">
          <CheckCircle2 className="text-green-600 mr-3" size={32} />
          <div>
            <span className="font-bold block mb-0.5">
              Thank you for submitting!
            </span>
            <span className="block text-sm text-gray-700">
              We&apos;ll contact you soon about your property.
            </span>
          </div>
        </div>,
        {
          duration: 4000,
          className:
            "bg-white text-gray-900 shadow-lg border-2 border-green-600 px-6 py-4 rounded-xl",
        }
      );
      setFormData({ name: "", phone: "", email: "", city: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full"
      style={{ maxWidth: "100%" }}
    >
      <Input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="flex-1 min-w-0"
        required
      />
      <Input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="flex-1 min-w-0"
        required
      />
      <Input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        className="flex-1 min-w-0"
        required
      />
      <Input
        type="text"
        name="city"
        placeholder="Your City"
        value={formData.city}
        onChange={handleChange}
        className="flex-1 min-w-0"
        required
      />
      <Button
        type="submit"
        variant="accent"
        className="w-full md:w-auto whitespace-nowrap mt-2 md:mt-0"
        disabled={isSubmitting}
      >
        {ctaLabel}
      </Button>
    </form>
  );
};

export default PropertyInquiryFormHorizontal;
