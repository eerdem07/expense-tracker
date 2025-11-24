import { z } from "zod";

export const addWalletDto = z.object({
  name: z.string().min(1).max(50),
  type: z.enum(["cash", "bank", "credit"]),
  currency: z.string().length(3).trim().toUpperCase(),
  openingBalance: z.coerce.number().nonnegative().optional().default(0),
});
