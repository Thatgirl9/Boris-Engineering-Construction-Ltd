import { z } from "zod";

export const PROJECT_TYPES = [
  "Building Construction",
  "Civil & Structural Engineering",
  "Building Renovation & Rehabilitation",
  "Floor & Wall Tiling",
  "Concrete Works",
  "Project Management",
  "Building Maintenance",
  "Other",
] as const;

export const quoteRequestSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20)
    .regex(/^[0-9+()\-\s]+$/, "Enter a valid phone number"),
  email: z.email("Enter a valid email address"),
  projectLocation: z
    .string()
    .trim()
    .min(2, "Enter the project location")
    .max(160),
  projectType: z.enum(PROJECT_TYPES).optional(),
  estimatedBudget: z.string().trim().max(60).optional().or(z.literal("")),
  preferredStartDate: z.string().trim().max(40).optional().or(z.literal("")),
  description: z.string().trim().max(4000).optional().or(z.literal("")),
  // Honeypot field — must stay empty. Bots that autofill every field will
  // trip this; real users never see it (visually hidden in the form).
  company: z.string().max(0).optional().or(z.literal("")),
  attachments: z
    .array(
      z.object({
        name: z.string().trim().min(1).max(255),
        path: z.string().trim().min(1).max(255),
        size: z
          .number()
          .positive()
          .max(20 * 1024 * 1024), // 20MB
        type: z.string().trim().max(100).optional().or(z.literal("")),
      }),
    )
    .optional(),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
