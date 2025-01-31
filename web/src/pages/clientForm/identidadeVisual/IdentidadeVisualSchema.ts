import { z } from "zod"

export const IdentidadeVisualSchema = z.object({
  files: z
    .array(
      z.object({
        file: z.instanceof(File).optional(),
      }),
    )
    .max(5),
})
export type IdentidadeVisualFormData = z.infer<typeof IdentidadeVisualSchema>
