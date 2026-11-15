import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cardSchema } from '../schemas/cardSchema';

const DESCRIPTION_PLACEHOLDERS = {
  Creature: 'Ej. Vuela, prisa. Cuando esta criatura entra al campo de batalla, inflige 2 puntos de daño...',
  Instant: 'Ej. Inflige 3 puntos de daño a cualquier objetivo o contrarresta el hechizo objetivo...',
  Sorcery: 'Ej. Roba dos cartas y luego descarta una carta de tu mano...',
  Enchantment: 'Ej. Las criaturas que controlas obtienen +1/+1 y tienen vigilancia...',
  Artifact: 'Ej. {T}: Agrega un maná de cualquier color a tu reserva de maná...',
  Planeswalker: 'Ej. +2: Roba una carta. -3: Destruye la criatura objetivo. -7: Obtienes un emblema...',
};

export function CreateCardForm({
  onSubmitCard,
  isPending = false,
  isSuccess = false,
  isError = false,
  errorMessage = '',
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      name: '',
      color: 'Red',
      type: 'Creature',
      manaCost: 3,
      power: 3,
      health: 3,
      loyalty: 0,
      description: '', // Actualizado aquí
      imageURL: 'https://cards.scryfall.io/art_crop/front/7/7/77c6fa74-5543-42ac-9ead-0e890b188e99.jpg',
    },
  });

  const selectedType = watch('type');
  const isCreature = selectedType === 'Creature';
  const isPlaneswalker = selectedType === 'Planeswalker';

  const { onChange: handleTypeFieldChange, ...typeRegisterProps } = register('type');

  const handleCardTypeChange = (event) => {
    handleTypeFieldChange(event);
    const nextType = event.target.value;

    if (nextType === 'Creature') {
      setValue('power', 3, { shouldValidate: true });
      setValue('health', 3, { shouldValidate: true });
      setValue('loyalty', 0, { shouldValidate: true });
    } else if (nextType === 'Planeswalker') {
      setValue('power', 0, { shouldValidate: true });
      setValue('health', 0, { shouldValidate: true });
      setValue('loyalty', 4, { shouldValidate: true });
    } else {
      setValue('power', 0, { shouldValidate: true });
      setValue('health', 0, { shouldValidate: true });
      setValue('loyalty', 0, { shouldValidate: true });
    }
  };

  const handleValidSubmit = (validData) => {
    onSubmitCard(validData, () => reset());
  };

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

  const singleLineStyle = {
    ...baseFieldStyle,
    height: '42px',
    padding: '0 0.65rem',
  };

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

      {isSuccess && (
        <div
          role="status"
          style={{
            padding: '0.75rem',
            backgroundColor: 'rgba(20, 65, 35, 0.92)',
            border: '1px solid #4ade80',
            borderRadius: '4px',
            color: '#bbf7d0',
            fontSize: '0.9rem',
          }}
        >
          ✅ Carta invocada y guardada correctamente en el grimorio remoto.
        </div>
      )}

      {isError && (
        <div
          role="alert"
          style={{
            padding: '0.75rem',
            backgroundColor: 'rgba(65, 18, 18, 0.92)',
            border: '1px solid #ff6b6b',
            borderRadius: '4px',
            color: '#fecaca',
            fontSize: '0.9rem',
          }}
        >
          ⚠️ Error al guardar la carta: {errorMessage}
        </div>
      )}

      <div>
        <label htmlFor="card-name">Nombre de la Carta *</label>
        <input
          id="card-name"
          type="text"
          placeholder="Ej. Lightning Bolt, Jace Beleren..."
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
          <select
            id="card-type"
            aria-invalid={!!errors.type}
            aria-describedby={errors.type ? 'error-type' : undefined}
            {...typeRegisterProps}
            onChange={handleCardTypeChange}
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

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isCreature ? '1fr 1fr 1fr' : isPlaneswalker ? '1fr 1fr' : '1fr',
          gap: '1rem',
        }}
      >
        <div>
          <label htmlFor="card-mana">Maná (0 - 16) *</label>
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

        {isCreature && (
          <>
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

            <div>
              <label htmlFor="card-health">Vida (1 - 20) *</label>
              <input
                id="card-health"
                type="number"
                aria-invalid={!!errors.health}
                aria-describedby={errors.health ? 'error-health' : undefined}
                {...register('health')}
                style={singleLineStyle}
              />
              {errors.health && (
                <span id="error-health" role="alert" style={errorStyle}>
                  ⚠️ {errors.health.message}
                </span>
              )}
            </div>
          </>
        )}

        {isPlaneswalker && (
          <div>
            <label htmlFor="card-loyalty">Lealtad Inicial (1 - 20) *</label>
            <input
              id="card-loyalty"
              type="number"
              aria-invalid={!!errors.loyalty}
              aria-describedby={errors.loyalty ? 'error-loyalty' : undefined}
              {...register('loyalty')}
              style={singleLineStyle}
            />
            {errors.loyalty && (
              <span id="error-loyalty" role="alert" style={errorStyle}>
                ⚠️ {errors.loyalty.message}
              </span>
            )}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="card-description">Descripción *</label>
        <textarea
          id="card-description"
          rows="3"
          placeholder={DESCRIPTION_PLACEHOLDERS[selectedType] || DESCRIPTION_PLACEHOLDERS.Creature}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? 'error-description' : undefined}
          {...register('description')}
          style={textareaStyle}
        />
        {errors.description && (
          <span id="error-description" role="alert" style={errorStyle}>
            ⚠️ {errors.description.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="card-image">URL de Ilustración *</label>
        <input
          id="card-image"
          type="url"
          placeholder="https://..."
          aria-invalid={!!errors.imageURL}
          aria-describedby={errors.imageURL ? 'error-image' : undefined}
          {...register('imageURL')}
          style={singleLineStyle}
        />
        {errors.imageURL && (
          <span id="error-image" role="alert" style={errorStyle}>
            ⚠️ {errors.imageURL.message}
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