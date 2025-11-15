import { z } from "zod";

export const addWallet = z.object({
  name: z.string().min(1).max(50),
  type: z.enum(["cash", "bank", "credit"]),
  currency: z.string().length(3).toUpperCase,
});
