import { z } from "zod";

export const complaintSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters").max(200, "Title must not exceed 200 characters"),
  description: z.string().trim().min(20, "Description must be at least 20 characters").max(2000, "Description must not exceed 2000 characters"),
  category: z.enum(["Road", "Electricity", "Water", "Sanitation", "Other"], {
    errorMap: () => ({ message: "Please select a valid category" })
  }),
  location: z.string().trim().min(5, "Location must be at least 5 characters").max(500, "Location must not exceed 500 characters"),
  priority: z.enum(["low", "medium", "high"], {
    errorMap: () => ({ message: "Please select a valid priority" })
  }).optional(),
});

export const feedbackSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must not exceed 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must not exceed 255 characters"),
  feedback_text: z.string().trim().min(10, "Feedback must be at least 10 characters").max(1000, "Feedback must not exceed 1000 characters"),
  rating: z.number().min(1, "Please provide a rating").max(5, "Rating must be between 1 and 5"),
});

export const authSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255, "Email must not exceed 255 characters"),
  password: z.string().min(8, "Password must be at least 8 characters").max(100, "Password must not exceed 100 characters"),
});

export const propertySchema = z.object({
  email: z.string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  address: z.string()
    .trim()
    .min(10, "Address must be at least 10 characters")
    .max(500, "Address must be less than 500 characters"),
  additionalDetails: z.string()
    .trim()
    .max(2000, "Additional details must be less than 2000 characters")
    .optional()
    .or(z.literal("")),
});

export const propertyInquirySchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  phone: z.string()
    .trim()
    .regex(/^[0-9]{10,15}$/, "Please enter a valid phone number (10-15 digits)"),
  email: z.string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  city: z.string()
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(100, "City must be less than 100 characters"),
});

export type ComplaintFormData = z.infer<typeof complaintSchema>;
export type FeedbackFormData = z.infer<typeof feedbackSchema>;
export type AuthFormData = z.infer<typeof authSchema>;
export type PropertyFormData = z.infer<typeof propertySchema>;
export type PropertyInquiryFormData = z.infer<typeof propertyInquirySchema>;
