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

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
});

export const productSchema = z.object({
  name: z.string().min(1, { message: "Product name is required." }),
  price: z.number().min(0, { message: "Price must be a positive number." }),
  category: z.string().min(1, { message: "Category is required." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  image: z.string().url({ message: "Must be a valid URL." }),
});
