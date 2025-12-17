import { z } from 'zod';

export const UserPrefsDto = z.object({
  locale: z
    .string()
    .trim()
    .regex(/^[a-z]{2}-[A-Z]{2}$/),
  timezone: z
    .string()
    .trim()
    .regex(/^[A-Za-z_]+\/[A-Za-z_]+$/),
  baseCurrency: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{3}$/),
});

export type UserPrefsDtoType = z.infer<typeof UserPrefsDto>;
