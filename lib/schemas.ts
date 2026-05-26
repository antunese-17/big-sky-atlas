import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Tell us your name").max(120),
  email: z.string().email("A valid email is required"),
  expedition: z.enum([
    "bighorn-sanctuary",
    "beartooth-summits",
    "wind-river-high-route",
    "teton-traverse",
    "snake-river-whitewater",
    "custom",
  ]),
  dates: z.string().min(2).max(120),
  groupSize: z.coerce.number().int().min(1).max(20),
  message: z.string().min(10, "Share a few lines").max(2000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
