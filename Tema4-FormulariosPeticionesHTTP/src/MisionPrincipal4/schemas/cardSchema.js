import { z } from 'zod';

const baseCardSchema = z.object({
  name: z.string().min(3, 'El nombre de la carta debe tener al menos 3 caracteres'),

  color: z.enum(['White', 'Blue', 'Black', 'Red', 'Green', 'Multicolor', 'Colorless'], {
    error: 'Selecciona una identidad de color válida',
  }),

  type: z.enum(['Creature', 'Instant', 'Sorcery', 'Enchantment', 'Artifact', 'Planeswalker'], {
    error: 'Selecciona un tipo de carta válido',
  }),

  manaCost: z.coerce
    .number({ error: 'El coste de maná debe ser numérico' })
    .min(0, 'El coste mínimo de maná es 0')
    .max(16, 'El coste máximo de maná es 16'),

  power: z.coerce
    .number({ error: 'La fuerza debe ser numérica' })
    .min(0, 'La fuerza mínima es 0')
    .max(20, 'La fuerza máxima permitida es 20'),

  health: z.coerce
    .number({ error: 'La vida debe ser numérica' })
    .min(0, 'La vida mínima es 0')
    .max(20, 'La vida máxima permitida es 20'),

  loyalty: z.coerce
    .number({ error: 'La lealtad debe ser numérica' })
    .min(0, 'La lealtad mínima es 0')
    .max(20, 'La lealtad máxima permitida es 20'),

  // Clave actualizada a description
  description: z.string().min(10, 'Introduce una descripción o efecto válido (mínimo 10 caracteres)'),

  imageURL: z.string().url('Debes introducir una URL de imagen válida'),
});

const validateMagicStats = (data, ctx) => {
  if (data.type !== 'Creature') {
    if (data.power > 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'Solo las criaturas pueden tener fuerza mayor que 0',
        path: ['power'],
      });
    }
    if (data.health > 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'Solo las criaturas pueden tener vida mayor que 0',
        path: ['health'],
      });
    }
  } else if (data.health < 1) {
    ctx.addIssue({
      code: 'custom',
      message: 'Una criatura debe tener al menos 1 punto de vida',
      path: ['health'],
    });
  }

  if (data.type !== 'Planeswalker' && data.loyalty > 0) {
    ctx.addIssue({
      code: 'custom',
      message: 'Solo los Planeswalkers pueden tener puntos de lealtad',
      path: ['loyalty'],
    });
  } else if (data.type === 'Planeswalker' && data.loyalty < 1) {
    ctx.addIssue({
      code: 'custom',
      message: 'Un Planeswalker debe tener al menos 1 punto de lealtad inicial',
      path: ['loyalty'],
    });
  }
};

export const cardSchema = baseCardSchema.superRefine(validateMagicStats);

export const apiCardSchema = baseCardSchema
  .extend({
    id: z.union([z.string(), z.number()]),
  })
  .superRefine(validateMagicStats);

export const apiCardsListSchema = z.array(apiCardSchema);