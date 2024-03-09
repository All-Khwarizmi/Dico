import z from "zod";

export const payloadSchema = z.object({
  word: z.string().min(1).max(30),
  source: z.enum(["fr", "es"]),
});

/**
 * Represents the payload type inferred from the `payloadSchema`.
 * @property {string} word - The word to translate.
 * @property {"fr" | "es"} source - The source language of the word.
 *
 * @example
 * ```ts
 * const payload: Payload = { word: "maison", source: "fr" };
 * ```
 * @example
 * ```ts
 * const payload: Payload = { word: "casa", source: "es" };
 * ```
 */
export type Payload = z.infer<typeof payloadSchema>;
