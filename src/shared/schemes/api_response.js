import { z } from "zod";
export const loginSchema = z.object({
    devId: z.string().min(1, "Developer ID is required"),
    password: z.string().min(1, "Password is required"),
});
