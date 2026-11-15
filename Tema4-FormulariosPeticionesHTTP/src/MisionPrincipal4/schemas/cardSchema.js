import { z } from 'zod';

// QUÉ: Definición del esquema Zod como única fuente de verdad para cartas de Magic: The Gathering.
// POR QUÉ: Centraliza tipos, rangos, mensajes propios y reglas de negocio cruzadas fuera del componente visual.
// QUÉ ALTERNATIVA SE DESCARTÓ: Validaciones nativas en HTML5 o dentro de register(), que no permiten cruzar campos como tipo y fuerza.

export const cardSchema = z
  .object({
    name: z.string().min(3, 'El nombre de la carta debe tener al menos 3 caracteres'),

    color: z.enum(['White', 'Blue', 'Black', 'Red', 'Green', 'Multicolor', 'Colorless'], {
      error: 'Selecciona una identidad de color válida',
    }),

    type: z.enum(['Creature', 'Instant', 'Sorcery', 'Enchantment', 'Artifact', 'Planeswalker'], {
      error: 'Selecciona un tipo de carta válido',
    }),

    // z.coerce.number() transforma el string del input HTML a número antes de validar los límites
    manaCost: z.coerce
      .number({ error: 'El coste de maná debe ser numérico' })
      .min(0, 'El coste mínimo de maná es 0')
      .max(16, 'El coste máximo de maná es 16'),

    power: z.coerce
      .number({ error: 'La fuerza debe ser numérica' })
      .min(0, 'La fuerza mínima es 0')
      .max(20, 'La fuerza máxima permitida es 20'),

    ability: z.string().min(10, 'Describe el efecto o habilidad (mínimo 10 caracteres)'),

    imageUrl: z.string().url('Debes introducir una URL de imagen válida'),
  })
  // QUÉ: Validación cruzada con .refine() y path apuntando a 'power'.
  // POR QUÉ: En Magic, los hechizos (Instant, Sorcery, Enchantment...) no tienen atributo de Fuerza; path coloca el error directo bajo ese input.
  // QUÉ ALTERNATIVA SE DESCARTÓ: Validar con condicionales if dentro de onSubmit, lo que rompería el principio de única fuente de verdad.
  .refine(
    (data) => {
      if (data.type !== 'Creature' && data.power > 0) {
        return false;
      }
      return true;
    },
    {
      error: 'Solo las cartas de tipo Creature pueden tener fuerza mayor que 0',
      path: ['power'],
    }
  );