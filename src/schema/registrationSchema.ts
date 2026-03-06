import { z } from "zod";

export const registrationSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    city: z.string().min(1, { message: "City is required." }),
    region: z.string().min(1, { message: "Region is required." }),
    postalCode: z.string().min(1, { message: "Postal code is required." }),
    countryCode: z.string().min(1, { message: "Country code is required." }),
    phoneNumber: z.string().min(7, { message: "Phone number must be valid." }),
    address: z.string().min(1, { message: "Address is required." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
    confirmPassword: z
      .string()
      .min(6, {
        message: "Confirm password must be at least 6 characters long.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });
