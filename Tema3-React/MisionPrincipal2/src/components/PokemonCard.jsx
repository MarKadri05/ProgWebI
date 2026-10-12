export function PokemonCard({ id, name, image }) {
  // Formatear el ID a 3 dígitos (ej: 1 -> #001)
  const formattedId = `#${String(id).padStart(3, '0')}`;

  return (
    <article className="pokemon-card">
      <span className="pokemon-id">{formattedId}</span>
      <img src={image} alt={name} className="pokemon-image" loading="lazy" />
      <h3 className="pokemon-name">{name}</h3>
    </article>
  );
}