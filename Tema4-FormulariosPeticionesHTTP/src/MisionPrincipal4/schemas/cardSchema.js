import { z } from 'zod';

// QUÉ: Definición del esquema Zod como única fuente de verdad.
// POR QUÉ: Centraliza la validación (tipos, rangos y mensajes de error) separándola de la lógica visual del componente React.
// QUÉ ALTERNATIVA SE DESCARTÓ: Usar las reglas de validación nativas integradas en 'register' (ej. { required: true, min: 1 })[cite: 2]. Se descartó porque no permiten validaciones complejas cruzadas ni sirven para validar los datos que llegan del servidor[cite: 2].

export const cardSchema = z.object({
  name: z.string().min(3, "El nombre de la carta es demasiado corto"),
  
  faction: z.enum(['Monsters', 'Nilfgaard', 'Northern Realms', 'Scoia\'tael', 'Skellige'], {
    errorMap: () => ({ message: "Selecciona una facción oficial de Gwent" }),
  }),
  
  // Zod extrae el valor del input (que siempre es string) y lo convierte a número automáticamente
  power: z.coerce.number({ invalid_type_error: "El poder debe ser numérico" })
    .min(1, "El poder mínimo es 1")
    .max(15, "El poder máximo permitido es 15"),
    
  position: z.enum(['close', 'ranged', 'siege'], {
    errorMap: () => ({ message: "Selecciona una posición táctica válida" }),
  }),
  
  ability: z.string().min(10, "Describe la habilidad (mínimo 10 caracteres)"),
  
  imageUrl: z.string().url("Debes introducir una URL de imagen válida")
});