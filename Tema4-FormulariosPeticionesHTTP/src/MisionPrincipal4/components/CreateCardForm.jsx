import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cardSchema } from '../schemas/cardSchema';

/**
 * Formulario no controlado para registrar nuevas cartas personalizadas de Magic: The Gathering.
 * @param {{ onSubmitCard: (data: Object, resetForm: Function) => void, isPending: boolean }} props
 */
export function CreateCardForm({ onSubmitCard, isPending = false }) {
  // QUÉ: Inicializamos React Hook Form conectándolo con nuestro esquema Zod mediante zodResolver.
  // POR QUÉ: Delega la validación a una única fuente de verdad externa y evita re-renderizados por cada tecla pulsada.
  // QUÉ ALTERNATIVA SE DESCARTÓ: Formularios controlados con useState por cada input, descartado por penalizar el rendimiento y duplicar lógica.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      name: '',
      color: 'Red',
      type: 'Creature',
      manaCost: 3,
      power: 3,
      ability: '',
      imageUrl: 'https://cards.scryfall.io/art_crop/front/7/7/77c6fa74-5543-42ac-9ead-0e890b188e99.jpg',
    },
  });

  // QUÉ: Función intermedia que recibe los datos ya validados y limpios por Zod.
  // POR QUÉ: handleSubmit solo ejecuta este callback si cardSchema tiene éxito; además pasamos reset() para limpiar el formulario tras guardar.
  // QUÉ ALTERNATIVA SE DESCARTÓ: Validar manualmente con condicionales if/else dentro del evento onSubmit.
  const handleValidSubmit = (validData) => {
    onSubmitCard(validData, () => reset());
  };

  // Estilo base con boxSizing: 'border-box' para que ningún campo sobresalga por la derecha
  const baseFieldStyle = {
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #d4af37',
    backgroundColor: '#121212',
    color: '#f1e8d9',
    marginTop: '0.3rem',
    fontFamily: 'inherit',
    fontSize: '0.88rem',
  };

  // Padding solo horizontal ('0 0.65rem') + altura fija (42px) para evitar cortes verticales y mantener simetría
  const singleLineStyle = {
    ...baseFieldStyle,
    height: '42px',
    padding: '0 0.65rem',
  };

  // Estilo específico para el área de texto de efectos/habilidades
  const textareaStyle = {
    ...baseFieldStyle,
    padding: '0.65rem',
    resize: 'vertical',
  };

  const errorStyle = {
    color: '#ff6b6b',
    fontSize: '0.82rem',
    marginTop: '0.25rem',
    display: 'block',
  };

  return (
    <form
      onSubmit={handleSubmit(handleValidSubmit)}
      noValidate
      style={{
        backgroundColor: 'rgba(28, 28, 28, 0.88)',
        backdropFilter: 'blur(6px)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.85)',
        border: '2px solid #d4af37',
        borderRadius: '8px',
        padding: '1.5rem',
        maxWidth: '550px',
        margin: '0 auto 2rem auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        color: '#f1e8d9',
        textAlign: 'left',
      }}
    >
      <h2 style={{ color: '#d4af37', margin: 0, textAlign: 'center' }}>
        ✨ Forjar Nueva Carta de Magic
      </h2>

      {/* Nombre de la carta */}
      <div>
        <label htmlFor="card-name">Nombre de la Carta *</label>
        <input
          id="card-name"
          type="text"
          placeholder="Ej. Lightning Bolt, Nicol Bolas..."
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'error-name' : undefined}
          {...register('name')}
          style={singleLineStyle}
        />
        {errors.name && (
          <span id="error-name" role="alert" style={errorStyle}>
            ⚠️ {errors.name.message}
          </span>
        )}
      </div>

      {/* Color de Maná y Tipo de Carta */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label htmlFor="card-color">Color de Maná *</label>
          <select
            id="card-color"
            aria-invalid={!!errors.color}
            aria-describedby={errors.color ? 'error-color' : undefined}
            {...register('color')}
            style={singleLineStyle}
          >
            <option value="White">☀️ White (Blanco)</option>
            <option value="Blue">💧 Blue (Azul)</option>
            <option value="Black">💀 Black (Negro)</option>
            <option value="Red">🔥 Red (Rojo)</option>
            <option value="Green">🌲 Green (Verde)</option>
            <option value="Multicolor">🌈 Multicolor</option>
            <option value="Colorless">💎 Colorless (Incoloro)</option>
          </select>
          {errors.color && (
            <span id="error-color" role="alert" style={errorStyle}>
              ⚠️ {errors.color.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="card-type">Tipo de Carta *</label>
          {/* deps: ['power'] fuerza la revalidación cruzada de 'power' si cambia el tipo */}
          <select
            id="card-type"
            aria-invalid={!!errors.type}
            aria-describedby={errors.type ? 'error-type' : undefined}
            {...register('type', { deps: ['power'] })}
            style={singleLineStyle}
          >
            <option value="Creature">🐉 Creature (Criatura)</option>
            <option value="Instant">⚡ Instant (Instantáneo)</option>
            <option value="Sorcery">📜 Sorcery (Conjuro)</option>
            <option value="Enchantment">🔮 Enchantment (Encantamiento)</option>
            <option value="Artifact">⚙️ Artifact (Artefacto)</option>
            <option value="Planeswalker">👑 Planeswalker</option>
          </select>
          {errors.type && (
            <span id="error-type" role="alert" style={errorStyle}>
              ⚠️ {errors.type.message}
            </span>
          )}
        </div>
      </div>

      {/* Coste de Maná y Fuerza */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label htmlFor="card-mana">Coste de Maná (0 - 16) *</label>
          <input
            id="card-mana"
            type="number"
            aria-invalid={!!errors.manaCost}
            aria-describedby={errors.manaCost ? 'error-mana' : undefined}
            {...register('manaCost')}
            style={singleLineStyle}
          />
          {errors.manaCost && (
            <span id="error-mana" role="alert" style={errorStyle}>
              ⚠️ {errors.manaCost.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="card-power">Fuerza (0 - 20) *</label>
          <input
            id="card-power"
            type="number"
            aria-invalid={!!errors.power}
            aria-describedby={errors.power ? 'error-power' : undefined}
            {...register('power')}
            style={singleLineStyle}
          />
          {errors.power && (
            <span id="error-power" role="alert" style={errorStyle}>
              ⚠️ {errors.power.message}
            </span>
          )}
        </div>
      </div>

      {/* Efecto / Habilidad */}
      <div>
        <label htmlFor="card-ability">Efecto / Texto de Reglas *</label>
        <textarea
          id="card-ability"
          rows="3"
          placeholder="Ej. Lightning Bolt hace 3 puntos de daño a cualquier objetivo..."
          aria-invalid={!!errors.ability}
          aria-describedby={errors.ability ? 'error-ability' : undefined}
          {...register('ability')}
          style={textareaStyle}
        />
        {errors.ability && (
          <span id="error-ability" role="alert" style={errorStyle}>
            ⚠️ {errors.ability.message}
          </span>
        )}
      </div>

      {/* URL de la imagen */}
      <div>
        <label htmlFor="card-image">URL de Ilustración *</label>
        <input
          id="card-image"
          type="url"
          placeholder="https://..."
          aria-invalid={!!errors.imageUrl}
          aria-describedby={errors.imageUrl ? 'error-image' : undefined}
          {...register('imageUrl')}
          style={singleLineStyle}
        />
        {errors.imageUrl && (
          <span id="error-image" role="alert" style={errorStyle}>
            ⚠️ {errors.imageUrl.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '0.8rem',
          backgroundColor: isPending ? '#555' : '#d4af37',
          color: '#121212',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '4px',
          cursor: isPending ? 'not-allowed' : 'pointer',
          fontSize: '0.95rem',
          marginTop: '0.5rem',
        }}
      >
        {isPending ? '⏳ Invocando carta...' : '✨ Añadir Carta al Mazo'}
      </button>
    </form>
  );
}