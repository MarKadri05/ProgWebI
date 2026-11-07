import { z } from "zod";

export const esquemaHackathon = z
  .object({
    nombre: z
      .string()
      .min(2, "El nombre es obligatorio (mínimo 2 caracteres)"),
    
    email: z
      .string()
      .email("Introduce una dirección de email válida"),
    
    nivel: z.enum(["principiante", "intermedio", "avanzada"], {
      errorMap: () => ({ message: "Selecciona tu nivel de experiencia" }),
    }),

    tallaCamiseta: z.enum(["S", "M", "L", "XL"], {
      errorMap: () => ({ message: "Selecciona una talla de camiseta" }),
    }),

    lenguajes: z
      .array(z.string())
      .min(1, "Debes seleccionar al menos un lenguaje de programación"),

    github: z
      .string()
      .url("Introduce una URL de GitHub válida (ej. https://github.com/usuario)")
      .optional()
      .or(z.literal("")),

    aceptanNormas: z.boolean().refine((val) => val === true, {
      message: "Debes aceptar las normas de la hackathon",
    }),
  })
  .refine(
    (datos) => {
      if (datos.nivel === "avanzada") {
        return !!datos.github && datos.github.trim() !== "";
      }
      return true;
    },
    {
      message: "El perfil de GitHub es obligatorio si seleccionas nivel 'avanzada'",
      path: ["github"],
    }
  );