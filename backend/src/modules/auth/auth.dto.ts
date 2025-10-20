import { z } from "zod";

const emailSchema = z.email("Geçerli bir e-posta giriniz");

const passwordSchema = z
  .string()
  .min(8, "Parola en az 8 karakter olmalı")
  .max(72, "Parola en fazla 72 karakter olabilir");

export const registerDto = z
  .object({
    email: emailSchema,
    name: z.string().trim().min(2).max(60),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  })
  .strict();

export const loginDto = z
  .object({
    email: emailSchema,
    password: z.string().min(1, "Parola zorunludur"),
  })
  .strict();

export type RegisterDto = z.infer<typeof registerDto>;

export type LoginDto = z.infer<typeof loginDto>;
