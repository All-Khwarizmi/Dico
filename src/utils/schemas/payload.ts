import z from "zod";

export const payloadSchema = z.object({
  word: z.string().min(1).max(1),
  direction: z.enum(["fr", "es"])
});
