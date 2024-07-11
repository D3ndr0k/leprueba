import { z } from "zod";

export const registroSchema = z.object({
  name: z.string().min(1, { message: "Required name" }),
  eori: z.string(),
  password: z.string().min(6, { message: "Minimum 6 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  address: z.string().min(3, { message: "Required address" }),
  country: z.string().min(1, { message: "Required Country" }),
});

export const loginSchema = z.object({
  password: z.string().min(8),
  email: z.string().email(),
});
