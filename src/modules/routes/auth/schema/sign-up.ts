import { z } from "zod";

import { SignInSchema } from "@/modules/routes/auth/schema/sign-in";

export const SignUpSchema = SignInSchema.extend({
  name: z.string().min(1, "Required").trim(),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;